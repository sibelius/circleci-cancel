export type Result = {
  next_page_token: string;
  items: ItemsItem[];
  message?: string;
};
export type ItemsItem = {
  id: string;
  errors: any[];
  project_slug: string;
  updated_at: string;
  number: number;
  state: string;
  created_at: string;
  trigger: Trigger;
  vcs: Vcs;
};
export type Trigger = {
  received_at: string;
  type: string;
  actor: Actor;
};
export type Actor = {
  login: string;
  avatar_url: string;
};
export type Vcs = {
  origin_repository_url: string;
  target_repository_url: string;
  revision: string;
  provider_name: string;
  commit: Commit;
  branch: string;
};
export type Commit = {
  body: string;
  subject: string;
};

export type GetPipelineList = {
  projectSlug: string;
  orgName: string;
  orgRepo: string;
  branch: string;
  authorization: string;
};
export const getPipelineList = async ({
  projectSlug,
  orgName,
  orgRepo,
  branch,
  authorization,
}: GetPipelineList): Promise<Result> => {
  const url = `https://circleci.com/api/v2/project/${projectSlug}/${orgName}/${orgRepo}/pipeline?branch=${branch}`;

  const options = {
    method: 'GET',
    headers: {
      'Circle-Token': authorization,
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};
