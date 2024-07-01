import mongoose from "mongoose";
import categoryModel from "./category-model";
import { Category } from "./category-types";

export class CategoryService {
    create(category: Category) {
        const newCategory = new categoryModel(category);
        return newCategory.save();
    }
    fetchAll() {
        return categoryModel.find();
    }
    fetchById(id: mongoose.Types.ObjectId) {
        return categoryModel.findOne({ _id: id });
    }
    updateCategoryById(id: mongoose.Types.ObjectId, updatedCategory: Category) {
        return categoryModel.findOneAndUpdate({ _id: id }, updatedCategory);
    }
    deleteCategoryById(id: mongoose.Types.ObjectId) {
        return categoryModel.findOneAndDelete({ _id: id });
    }
}
