export interface ApiResponse {
    workers: Worker[]; 
  }

export interface Worker {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    file: string;
    department: string; 
    phoneNo: number;
    district: string;
    image?: string;
    description?: string;
    requests: Request[];
    rating: Rating[];
    income?: number;
    isVerified: boolean;
    isBlocked: boolean;
  }
  
  interface Request {
    userInfo: string;
    requirement: string;
    file: string;
    date: Date;
    accepted: boolean;
    paymentStatus: string;
  }
  
  interface Rating {
    userRef: string; 
    starValue: number;
    comment: string;
    date: Date;
  }
  