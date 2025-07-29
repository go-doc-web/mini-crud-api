import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/User";
import { createError } from "../utils/ApiError";

// Get

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserModel.find();
    if (!users) {
      throw createError(404, "Users not found");
    }
    res.json(users);
  } catch (error) {
    next(error);
  }
};
// GET /users/:id

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      throw createError(404, "User not found");
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// POST /users

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const newUser = await UserModel.create({
      name,
      email,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

// PUT /users/:id

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error update user" });
  }
};
// DELETE /users/:id — Видалити
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};
