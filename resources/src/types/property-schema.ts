export interface TheInrealCloudPropertySchema {
  definitions: {
    [key: string]: {
      description: string;
      type: 'object';
      required: string[];
      properties: {
        [key: string]: {
          id: {
            $ref: string;
          };
          guid: {
            $ref: string;
          };
        };
      };
    };
  };
  properties: {
    [key: string]: {
      $id: string;
      $ref?: string;
      type?: 'array';
      items?: {
        $ref: string;
      };
    };
  };
}
