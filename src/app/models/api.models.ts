// Shapes of the data the SuperWise API sends and receives.

export type Role = 'user' | 'worker' | 'admin';
export type PaymentStatus = 'pending' | 'completed';

export interface ApiError {
  message: string;
}

export interface Category {
  _id: string;
  name: string;
  Image: string;
  description: string;
  categoryStatus?: boolean;
}

export interface ClientSummary {
  _id: string;
  firstName: string;
  lastName: string;
  image?: string;
}

export interface ClientContact extends ClientSummary {
  email: string;
  phone?: number;
  location?: string;
}

export interface Rating {
  _id: string;
  /** null when the client account has since been deleted. */
  userRef: ClientSummary | null;
  starValue: number;
  comment?: string;
  date: string;
}

export interface WorkRequest<C = ClientContact> {
  _id: string;
  userInfo: C;
  requirement: string;
  file?: string;
  date: string;
  accepted: boolean;
  paymentStatus: PaymentStatus;
}

export interface Worker {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: Category;
  phoneNo: number;
  district: string;
  image?: string;
  description?: string;
  rating: Rating[];
  isVerified: boolean;
  isBlocked: boolean;
}

/** A worker as they see themselves, including their requests and income. */
export interface WorkerSelf extends Worker {
  requests: WorkRequest[];
  income?: number;
}

/** A hired worker as the client sees them: only the client's own request. */
export interface HiredWorker extends Worker {
  requests: WorkRequest<string>[];
}

export interface ProgressImage {
  _id: string;
  workerId: string;
  imageUrl: string;
}

export interface WorkStatus<W = string> {
  _id: string;
  workerId: W;
  progressBar: number;
  images: ProgressImage[];
  status: string;
  paymentStatus: PaymentStatus;
}

export interface Payment {
  _id: string;
  workerId: string;
  type?: string;
  amount: number;
  date: string;
  payedDate: string | null;
  status: PaymentStatus;
}

export interface Client extends ClientContact {
  workStatus: WorkStatus[];
  payment: Payment[];
  isBlocked: boolean;
}

/** A client as a worker sees them on the progress page. */
export interface ClientForWorker extends ClientContact {
  workStatus: WorkStatus[];
  payment: Payment[];
}

/** A worker on the admin dashboard, where income is visible. */
export interface WorkerWithIncome extends Worker {
  income?: number;
}

/** A worker row in the admin's verification and worker lists. */
export interface AdminWorker {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  department?: string;
  phoneNo: number;
  district: string;
  image?: string;
  isVerified: boolean;
  isBlocked: boolean;
  hasProof: boolean;
  legacyProof: boolean;
}

export interface Complaint {
  _id: string;
  clientId: ClientContact;
  workerId: Pick<Worker, '_id' | 'firstName' | 'lastName' | 'email' | 'phoneNo' | 'district' | 'image'>;
  issue: string;
}

export interface ChatMessage {
  _id?: string;
  sender: string;
  senderId: string;
  recieverId: string;
  content: string;
  timestamp?: string;
}

export interface WorkersPerCategory {
  _id: string;
  departmentName: string;
  workerCount: number;
}

// Request bodies

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserSignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNo: string;
  location: string;
}

export interface OtpRequest {
  email: string;
  otp: string;
}

export interface UserProfileUpdate {
  firstName: string;
  lastName: string;
  phoneNo: number | string;
  location: string;
}

export interface WorkerProfileUpdate extends UserProfileUpdate {
  department: string;
}

export interface AmountRequest {
  selectedType: string;
  type?: string;
  amount: number;
}

export interface RazorpayResult {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

// Responses

export interface LoginResponse {
  msg: 'passMatched';
  token: string;
}

export interface DoneResponse {
  done: true;
}

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
}

export interface CreateOrderResponse {
  success: true;
  value: RazorpayOrder;
  key: string;
}
