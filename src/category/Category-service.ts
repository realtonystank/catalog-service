import CategoryModel from './category-model';
import { Category } from './category-types';

export class CategoryService {
    async create(category: Category) {
        console.log('category from service layer ->', category);
        const newCategory = new CategoryModel(category);
        return newCategory.save();
    }
}
