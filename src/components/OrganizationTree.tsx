import type { FC } from "react";
import { Tree } from "react-arborist";
interface OrganizationTreeProps {
  data: any;
}

const OrganizationTree: FC<OrganizationTreeProps> = ({ data }) => {
  return (
    <Tree
      // initialData={data}
      data={data}
      onCreate={async (data: any): Promise<any> => {
        console.log(data);
      }}
    />
  );
};
export default OrganizationTree;
