
import { supabase } from './client';

// Function to initialize storage buckets
export const initStorageBuckets = async () => {
  try {
    // Check if the avatars bucket exists
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('Error checking storage buckets:', error);
      return;
    }
    
    // Check if the avatars bucket exists
    const avatarsBucketExists = buckets.some(bucket => bucket.name === 'avatars');
    
    // If it doesn't exist, create it
    if (!avatarsBucketExists) {
      const { data, error: createError } = await supabase.storage.createBucket(
        'avatars',
        { public: true }
      );
      
      if (createError) {
        console.error('Error creating avatars bucket:', createError);
      } else {
        console.log('Avatars bucket created successfully');
      }
    }
  } catch (error) {
    console.error('Error initializing storage buckets:', error);
  }
};

// Export utility functions for working with storage
export const getPublicUrl = (bucket: string, path: string) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};
