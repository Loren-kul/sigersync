File: src/components/categories/CategoriesManager.tsx
Kodenya :
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { CategoryCard } from './CategoryCard';
import { CategoryFormModal } from './CategoryFormModal';
import { ApiService } from '../../lib/api-service';
import { Category, CreateCategoryForm, UpdateCategoryForm } from '../../types';

/**
 * Main Categories Management Page
 * Handle list, create, update, delete categories
 */
export const CategoriesManager: React.FC = () => {
  // State management
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Load categories on mount
  useEffect(() => {
    loadCategories();
  }, []);

  /**
   * Fetch categories dari API
   */
  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getCategories();
      setCategories(response);
    } catch (err) {
      setError('Failed to load categories');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create new category
   */
  const handleCreateCategory = async (data: CreateCategoryForm) => {
    try {
      await ApiService.createCategory(data);
      await loadCategories();
    } catch (err) {
      console.error('Failed to create category:', err);
      alert('Failed to create category');
    }
  };

  /**
   * Update existing category
   */
  const handleUpdateCategory = async (data: UpdateCategoryForm) => {
    if (!editingCategory) return;

    try {
      await ApiService.updateCategory(editingCategory.id, data);
      await loadCategories();
      setEditingCategory(null);
    } catch (err) {
      console.error('Failed to update category:', err);
      alert('Failed to update category');
    }
  };

  /**
   * Delete category
   */
  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      await ApiService.deleteCategory(id);
      await loadCategories();
    } catch (err) {
      console.error('Failed to delete category:', err);
      alert('Failed to delete category');
    }
  };

  /**
   * Open edit modal
   */
  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  /**
   * Close modal dan reset editing state
   */
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  /**
   * Handle form submit - create or update based on editingCategory
   */
  const handleModalSubmit = (data: CreateCategoryForm | UpdateCategoryForm) => {
    if (editingCategory) {
      handleUpdateCategory(data as UpdateCategoryForm);
    } else {
      handleCreateCategory(data);
    }
  };

  // Loading state
  if (loading) {
    return <div className="text-center py-8">Loading categories...</div>;
  }

  // Error state
  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header dengan title dan tombol add */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Categories Management
        </h1>
        <Button onClick={() => setIsModalOpen(true)}>
          Add New Category
        </Button>
      </div>

      {/* Grid categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
          />
        ))}
      </div>

      {/* Empty state */}
      {categories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No categories found. Create your first category!
          </p>
        </div>
      )}

      {/* Form modal */}
      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        initialData={editingCategory || {}}
        isEditing={!!editingCategory}
      />
    </div>
  );
};
