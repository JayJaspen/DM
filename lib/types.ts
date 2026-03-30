export type DeviceStatus = "active" | "inactive" | "lost" | "wiped";
export type DevicePlatform = "iOS" | "Android" | "Windows" | "macOS" | "Other";
export type UserRole = "admin" | "technician" | "user";
export type PolicyStatus = "active" | "draft" | "archived";
export type ExchangeStatus = "pending" | "approved" | "rejected" | "completed";

export interface Device {
  id: string;
  name: string;
  serial_number: string;
  platform: DevicePlatform;
  os_version: string;
  model: string;
  status: DeviceStatus;
  owner_id: string | null;
  enrolled_at: string;
  last_seen: string | null;
  policy_ids: string[];
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  department: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface Policy {
  id: string;
  name: string;
  description: string | null;
  status: PolicyStatus;
  platform: DevicePlatform | "All";
  rules: PolicyRule[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface PolicyRule {
  key: string;
  label: string;
  value: string | boolean | number;
}

export interface ExchangeRequest {
  id: string;
  requester_id: string;
  device_id: string;
  reason: string;
  status: ExchangeStatus;
  new_device_model: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  total_devices: number;
  active_devices: number;
  inactive_devices: number;
  lost_devices: number;
  total_users: number;
  active_policies: number;
  pending_exchanges: number;
}
