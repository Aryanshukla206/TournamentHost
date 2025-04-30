import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTournament } from '../context/TournamentContext';
import { 
  Calendar, 
  Trophy, 
  PlusCircle, 
  MinusCircle, 
  Info,
  CheckCircle
} from 'lucide-react';

const CreateTournamentPage = () => {
  const { currentUser } = useAuth();
  const { createTournament } = useTournament();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    rules: '',
    sports: [''],
  });
  
  const [isCreating, setIsCreating] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSportChange = (index, value) => {
    const updatedSports = [...formData.sports];
    updatedSports[index] = value;
    setFormData({
      ...formData,
      sports: updatedSports,
    });
  };
  
  const addSport = () => {
    setFormData({
      ...formData,
      sports: [...formData.sports, ''],
    });
  };
  
  const removeSport = (index) => {
    const updatedSports = [...formData.sports];
    updatedSports.splice(index, 1);
    setFormData({
      ...formData,
      sports: updatedSports,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate dates
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      alert('End date must be after start date');
      return;
    }
    
    // Filter out empty sports
    const filteredSports = formData.sports.filter(sport => sport.trim() !== '');
    
    if (filteredSports.length === 0) {
      alert('Please add at least one sport');
      return;
    }
    
    setIsCreating(true);
    
    // Create tournament with filtered sports
    const tournamentData = {
      ...formData,
      sports: filteredSports,
    };
    
    try {
      const newTournament = createTournament(tournamentData, currentUser.id);
      
      // Show success message
      setSuccess(true);
      
      // Redirect to tournament page after short delay
      setTimeout(() => {
        navigate(`/dashboard/tournaments/${newTournament.id}`);
      }, 1500);
    } catch (error) {
      console.error('Error creating tournament:', error);
      alert('Failed to create tournament. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-success-100 p-3">
              <CheckCircle className="h-12 w-12 text-success-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Tournament Created!</h2>
          <p className="text-neutral-600 mb-4">
            Your tournament has been created successfully. Redirecting you to the tournament page...
          </p>
          <div className="animate-pulse">
            <div className="h-1 w-full bg-primary-200 rounded">
              <div className="h-1 bg-primary-600 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Create a Tournament</h1>
        <p className="text-neutral-600">
          Set up a new tournament and invite players to join with a unique code.
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Tournament Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                Tournament Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="block w-full px-4 py-3 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., Summer Championship 2025"
              />
            </div>
            
            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-neutral-700 mb-1">
                  Start Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-neutral-700 mb-1">
                  End Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Sports */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-neutral-700">
                  Sports
                </label>
                <button
                  type="button"
                  onClick={addSport}
                  className="flex items-center text-primary-600 hover:text-primary-800 text-sm"
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add Sport
                </button>
              </div>
              
              <div className="space-y-3">
                {formData.sports.map((sport, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="text"
                      value={sport}
                      onChange={(e) => handleSportChange(index, e.target.value)}
                      className="block flex-1 px-4 py-3 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g., Cricket, Football, Chess"
                    />
                    {formData.sports.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSport(index)}
                        className="ml-2 p-2 text-neutral-500 hover:text-error-600"
                      >
                        <MinusCircle className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              <p className="mt-2 text-xs text-neutral-500 flex items-start">
                <Info className="h-3 w-3 mr-1 mt-0.5" />
                Add all sports that will be part of this tournament
              </p>
            </div>
            
            {/* Rules */}
            <div>
              <label htmlFor="rules" className="block text-sm font-medium text-neutral-700 mb-1">
                Tournament Rules (Optional)
              </label>
              <textarea
                id="rules"
                name="rules"
                value={formData.rules}
                onChange={handleChange}
                rows={4}
                className="block w-full px-4 py-3 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="Describe the rules and format of your tournament..."
              />
            </div>
            
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isCreating}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                {isCreating ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Trophy className="h-5 w-5 mr-2" />
                    Create Tournament
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTournamentPage;