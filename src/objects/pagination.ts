export interface PaginationRequest {
  page: number;
  size: number;
  search?: string;
  approval_status?: string;
  type?: string;
  types?: string;
  project_id?: string;
  team_id?: string;
  employee_id?: string;
  employee_ids?: string;
  start_date?: string;
  end_date?: string;
  order?: string;
  tag_ids?: string;
  is_unread?: boolean | null;
  is_unreplied?: boolean | null;
}

export interface PaginationResponse {
  page: number;
  size: number;
  max_page?: number;
  total_pages: number;
  total: number;
  last?: boolean;
  first?: boolean;
  visible?: number;
}
