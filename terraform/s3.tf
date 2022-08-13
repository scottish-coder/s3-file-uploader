variable "s3_bucket_name" {
  type    = string
  default = "s3-react-upload-video"
}

resource "aws_s3_bucket" "upload-bucket" {
  bucket = var.s3_bucket_name
}

resource "aws_s3_bucket_policy" "allow_public_access" {
  bucket = aws_s3_bucket.upload-bucket.id
  policy = data.aws_iam_policy_document.allow_public_access.json
}

data "aws_iam_policy_document" "allow_public_access" {
  statement {
    principals {
      type = "*"
      identifiers = ["*"]
    }
    actions = ["s3:List*",
    "s3:Get*"]
    resources = [
      "arn:aws:s3:::${var.s3_bucket_name}",
      "arn:aws:s3:::${var.s3_bucket_name}/*"
    ]
  }
}

resource "aws_s3_bucket_cors_configuration" "example" {
  bucket = aws_s3_bucket.upload-bucket.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST", "DELETE", "GET"]
    allowed_origins = ["*"]
    expose_headers  = []
  }
}
