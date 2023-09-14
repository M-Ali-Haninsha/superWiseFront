export interface adminLogin {
  email: string;
  password: string;
}

export interface returnedDataLogin {
  msg: string;
  token?: string;
}

// export interface getworker {
//   workers: worker[];
// }

// interface worker {
//   department: department;
//   description?:string;
//   district: string;
//   email: string;
//   file: string;
//   firstName: string;
//   image?: string;
//   income?: number;
//   isBlocked: boolean;
//   isVerified: boolean;
//   lastName: string;
//   password: string;
//   phoneNo: number;
//   rating?: ratings[];
//   requests?: request[];
//   _id:string;
// }

// interface department {
//     name:string;
//     image:string;
//     description: string;
//     categoryStatus: boolean;
// }

// interface request {
//   accepted: boolean;
//   date: Date;
//   paymentStatus: string;
//   requirement: string;
//   userInfo: userInfo;
//   _id: string;
// }

// interface userInfo{
//     firstName:string;
//     lastName:string
//     email:string;
//     phone:number;
//     password:string;
//     location:string;
//     image:string;
//     workStatus:workStatus[];
//     payment:payment[];
//     isBlocked: boolean;
// }

// interface workStatus {
//     workerId: worker;
//     progressBar: number;
//     images:[progressImage];
//     status:string;
//     paymentStatus:string
// }

// interface progressImage {
//     workerId: worker;
//     imageUrl: string;
// }

// interface payment {
//     workerId:worker;
//     type: string;
//     amount: number;
//     date: Date;
//     payedDate: Date;
//     status:string
// }

// interface ratings {
//   comment: string;
//   date: Date;
//   starValue: number;
//   userRef: string;
//   _id: string;
// }
