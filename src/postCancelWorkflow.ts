export type Result = {
  message: string;
};

export type CancelWorkflow = {
  workflowId: string;
  authorization: string;
};
export const postCancelWorkflow = async ({
  workflowId,
  authorization,
}: CancelWorkflow): Promise<Result> => {
  const url = `https://circleci.com/api/v2/workflow/${workflowId}/cancel`;

  const options = {
    method: 'POST',
    headers: {
      'Circle-Token': authorization,
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};
