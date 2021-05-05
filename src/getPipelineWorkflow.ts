export type Result = {
  next_page_token: null;
  items: ItemsItem[];
};
export type ItemsItem = {
  pipeline_id: string;
  id: string;
  name: string;
  project_slug: string;
  status: string;
  started_by: string;
  pipeline_number: number;
  created_at: string;
  stopped_at: null;
};

export type GetPipelineWorkflow = {
  pipelineId: string;
  authorization: string;
};
export const getPipelineWorkflow = async ({
  pipelineId,
  authorization,
}: GetPipelineWorkflow): Promise<Result> => {
  const url = `https://circleci.com/api/v2/pipeline/${pipelineId}/workflow`;

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
