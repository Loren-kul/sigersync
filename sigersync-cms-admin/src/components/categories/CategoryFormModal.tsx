import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input, Textarea } from '../ui/Form';
import { Button } from '../ui/Button';
import { CreateCategoryForm, UpdateCategoryForm } from '../../types';

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCategoryForm | UpdateCategoryForm) => void;
  initialData?: Partial<CreateCategoryForm>;
  isEditing?: boolean;
}

/**
 * Form modal untuk create/update category
 */
export const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = {},
  isEditing = false,
}) => {
  // Initialize form state
  const [formData, setFormData] = useState<CreateCategoryForm>({
    name: initialData.name || '',
    slug: initialData.slug || '',
    description: initialData.description || '',
    icon: initialData.icon || '',
  });

  // Track validation errors
  const [errors, setErrors] = useState<Partial<CreateCategoryForm>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Partial<CreateCategoryForm> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.slug.trim()) newErrors.slug = 'Slug is required';

    // Jika ada error, jangan submit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form
    onSubmit(formData);
    
    // Reset form
    setFormData({ name: '', slug: '', description: '', icon: '' });
    setErrors({});
    onClose();
  };

  const handleInputChange = (field: keyof CreateCategoryForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error untuk field ini saat user mulai mengetik
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Category' : 'Create New Category'}
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          error={errors.name}
          placeholder="e.g., Wisata Alam"
        />

        <Input
          label="Slug"
          value={formData.slug}
          onChange={(e) => handleInputChange('slug', e.target.value)}
          error={errors.slug}
          placeholder="e.g., wisata-alam"
        />

        <Textarea
          label="Description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Describe this category..."
          rows={3}
        />

        <Input
          label="Icon (Emoji)"
          value={formData.icon}
          onChange={(e) => handleInputChange('icon', e.target.value)}
          placeholder="e.g., 🌿"
        />

        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
