import { useState, useEffect } from 'react';
import { db } from '../../../lib/firebaseClient';
import { doc, setDoc } from 'firebase/firestore';

export default function AddPackPopup({ isOpen, onClose, packData, onSave }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [questions, setQuestions] = useState(['']); // Stato per le domande
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (packData) {
      // Carica le informazioni del pacchetto e le domande esistenti quando si modifica un pacchetto
      setTitle(packData.title);
      setCategory(packData.category);
      setQuestions(packData.questions || ['']); // Se non ci sono domande, usa un array vuoto
    }
  }, [packData]);

  const handleQuestionChange = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, '']);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSave = async () => {
    setLoading(true);

    const packRef = doc(db, 'packs', packData ? packData.id : Date.now().toString());
    try {
      await setDoc(packRef, {
        title,
        category,
        questions,
      }, { merge: true });

      // Passa i nuovi dati al componente genitore
      onSave({ id: packRef.id, title, category, questions });
      onClose();
    } catch (error) {
      console.error('Errore durante il salvataggio del pacchetto:', error);
    }
    setLoading(false);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg w-1/3">
          <h3 className="text-xl font-semibold text-[#030711]">{packData ? 'Edit Pack' : 'Add Pack'}</h3>

          <label className="block mt-4 text-[#030711] text-[14px]">
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full text-[#030711] text-[14px]"
            />
          </label>

          <label className="block mt-4 text-[#030711] text-[14px]">
            Category:
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full text-[#030711] text-[14px]"
            />
          </label>

          <div className="mt-4">
            <label className="block text-[#030711] text-[14px]">Questions:</label>
            {questions.map((question, index) => (
              <div key={index} className="flex items-center mt-2">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => handleQuestionChange(index, e)}
                  className="p-2 border border-gray-300 rounded-md w-full text-[#030711] text-[14px]"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(index)}
                  className="ml-2 text-red-500 text-[14px]"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddQuestion}
              className="mt-2 text-[#3471FF] text-[14px]"
            >
              Add question
            </button>
          </div>

          <div className="mt-6 flex justify-end text-[14px]">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#3471FF] text-white rounded-md"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    )
  );
}
