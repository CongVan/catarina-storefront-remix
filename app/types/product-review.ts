export type ReviewStatus =
  | "approved"
  | "hold"
  | "spam"
  | "unspam"
  | "trash"
  | "untrash";

export interface ProductReview {
  id: number;
  reviewer: string;
  date_created_gmt: string;
  date_created: string;
  product_id: number;
  status: ReviewStatus;
  reviewer_email: string;
  review: string;
  rating: number;
  verified: boolean;
}
