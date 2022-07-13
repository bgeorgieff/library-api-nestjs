export enum Endpoint {
  ById = ':id',
  Login = 'login',
  Register = 'register',
  ForgotPassword = 'forgot-password',
  ResetPassword = 'reset-password',
  CheckToken = 'validate',
  AllBooks = 'all-books',
  NewlyAddedBooks = 'newly-added-books',
  AddBook = 'add-book',
  CommentsOfUser = 'of-user/:id',
  CommentsOfBook = 'of-book/:id',
  UploadImg = 'upload-image/:id',
  UpdateQty = 'update-quantity/:id',
  Count = 'count',
  RentBook = 'rent-book/:id',
  ApproveRent = 'approve-rent/:id',
  MarkAsReturned = 'mark-returned/:id',
  GetApprovedRents = 'get-approved',
  GetReturnedRents = 'get-returned',
  MessageToAdmin = 'to-admin',
  MessageToUser = 'to-user',
  GetAllAdminMessages = 'all-admin',
  GetAllUserMessages = 'all-user',
  SubscribeUser = 'subscribe-user',
  SubscribeAdmin = 'subscribe-admin',
  GetUser = 'user/:id',
}