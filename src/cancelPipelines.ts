import 'isomorphic-fetch';
import { getPipelineList } from './getPipelineList';
import { getPipelineWorkflow } from './getPipelineWorkflow';
import { postCancelWorkflow } from './postCancelWorkflow';

const run = async () => {
  const projectSlug = 'gh';

  const [, , ...unsanitizedArgs] = process.argv;

  console.log({
    unsanitizedArgs,
  });
  if (unsanitizedArgs.length !== 4) {
    //eslint-disable-next-line
    console.log(
      `
        Usage: yarn cancel <authorization> <orgName> <orgRepo> <branch>
      `,
    );
    return;
  }

  const [authorization, orgName, orgRepo, branch] = unsanitizedArgs;

  // eslint-disable-next-line
  console.log(`Canceling jobs of ${orgName}/${orgRepo} ${branch}`);

  const pipelines = await getPipelineList({
    projectSlug,
    orgName,
    orgRepo,
    branch,
    authorization,
  });

  if (pipelines.message) {
    // eslint-disable-next-line
    console.log(pipelines.message);
    return;
  }

  // do not cancel latest master branch
  // eslint-disable-next-line
  const [_latest, ...rest] = pipelines.items;

  for (const pipeline of rest) {
    const pipelineId = pipeline.id;

    const workflows = await getPipelineWorkflow({
      pipelineId,
      authorization,
    });

    for (const workflow of workflows.items) {
      const workflowId = workflow.id;
      const result = await postCancelWorkflow({
        workflowId,
        authorization,
      });

      // eslint-disable-next-line
      console.log('workflow cancelled', {
        workflowId,
        result,
      });
    }
  }
};

(async () => {
  try {
    await run();
  } catch (err) {
    // eslint-disable-next-line
    console.log({
      err,
    });
    process.exit(1);
  }

  process.exit(0);
})();
