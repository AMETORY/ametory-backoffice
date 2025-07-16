import type { AgentModel } from "./agent";

export interface DeviceModel {
  id?: string;
  device_id?: string;
  status?: string;
  is_connected?: boolean;
  agent_id?: string;
  agent?: AgentModel;
}
