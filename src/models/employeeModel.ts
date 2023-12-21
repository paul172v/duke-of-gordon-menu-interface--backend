import crypto from "crypto";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const employeeSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: new mongoose.Types.ObjectId(),
    required: [true, "Employee must have an ID"],
  }, // Explicitly declare the _id field
  firstName: {
    type: String,
    required: [true, "Employee must have a first name"],
  },
  middleName: {
    type: String,
    optional: true,
  },
  lastName: {
    type: String,
    required: [true, "Employee must have a last name"],
  },
  role: {
    type: String,
    required: [true, "Employee must have a role"],
    default: "Pending",
    enum: ["Manager", "Chef", "FOH", "Pending"],
  },
  email: {
    type: String,
    required: [true, "Employee must have an email address"],
    unique: [true, "A single email address can only be tied to one account"],
  },
  password: {
    type: String,
    required: [true, "Employee must have a password"],
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

employeeSchema.pre("save", async function (next) {
  // Only run if the password was modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }
  this.passwordChangedAt = new Date(Date.now() - 1000); // The -1000 (1second) is to avoid bugs where there is a delay before the document is saved

  next();
});

employeeSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
  if (this.passwordChangedAt) {
    const passwordChangedTimestamp = this.passwordChangedAt.getTime() / 1000;
    return JWTTimestamp < passwordChangedTimestamp;
  }

  // false means not changed
  return false;
};

employeeSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  /* remove when test successful */
  // console.log(
  //   { sentResetToken: resetToken },
  //   { documentResetToken: this.passwordResetToken }
  // );
  /* ------ */

  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  return resetToken;
};

interface IEmployee extends mongoose.Document {
  _id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  role: string;
  email: string;
  password: string;
  passwordChangedAt: Date;
  passwordResetToken: string | undefined;
  passwordResetExpires: Date | undefined;
  correctPassword: Function;
  changedPasswordAfter: Function;
  createPasswordResetToken: Function;
}

const Employee = mongoose.model<IEmployee>("employee", employeeSchema);

export default Employee;
