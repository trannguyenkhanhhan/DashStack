import { useState, useEffect, useCallback } from 'react';
import ApiService from '../apis/ApiService';

export const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiService.callApiAsync('contacts', 'GET');
      setContacts(response.data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const addContact = async (newContactData) => {
    try {
      // If the img field is empty, use a default placeholder.
      if (!newContactData.img) {
        newContactData.img = './anonymous.png';
      }
      await ApiService.callApiAsync('contacts', 'POST', newContactData);
      await fetchContacts(); // Refetch to get the updated list
    } catch (err) {
      setError(`Failed to add contact: ${err.message}`);
      // Re-throw the error so the component knows the operation failed
      throw err;
    }
  };

  return { contacts, loading, error, addContact };
};
