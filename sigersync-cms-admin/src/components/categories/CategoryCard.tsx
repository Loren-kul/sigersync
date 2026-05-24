"use client"; 

import React from 'react';
import { Category } from '../../types';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

/**
 * Category Card Display
 */
export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onEdit,
  onDelete,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {category.icon && (
              <span className="text-2xl">{category.icon}</span>
            )}
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500">/{category.slug}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onEdit(category)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(category.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-2">{category.description}</p>
        <p className="text-sm text-gray-500">
          {category.destinations?.length || 0} destinations
        </p>
      </CardContent>
    </Card>
  );
};
