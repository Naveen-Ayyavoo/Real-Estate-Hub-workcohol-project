import { useState } from 'react';

export const usePropertyForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    price: '',
    propertyType: 'house',
    photos: []
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Property title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Valid price is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files.filter(file => {
      return file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024; // 10MB limit
    });

    const newPhotos = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos].slice(0, 10) // Max 10 photos
    }));
  };

  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      console.log('Property data:', formData);
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error('Failed to add property:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    dragActive,
    setDragActive,
    handleInputChange,
    handleFileSelect,
    removePhoto,
    handleSubmit
  };
};