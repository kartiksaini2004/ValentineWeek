import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import ProposalPage from './components/ProposalPage';
import CalendarPage from './components/CalendarPage';
import DayPage from './components/DayPage';
import { Heart } from 'lucide-react';

type View = 'proposal' | 'calendar' | 'day';

function App() {
  const [view, setView] = useState<View>('proposal');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [visitedDays, setVisitedDays] = useState<number[]>([]);
  const [stateId, setStateId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadState();
  }, []);

  const loadState = async () => {
    try {
      const { data, error } = await supabase
        .from('valentine_state')
        .select('*')
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading state:', error);
        setLoading(false);
        return;
      }

      if (data) {
        setStateId(data.id);
        setHasAccepted(data.has_accepted);
        setVisitedDays(data.days_visited || []);
        if (data.has_accepted) {
          setView('calendar');
        }
      } else {
        const { data: newState, error: insertError } = await supabase
          .from('valentine_state')
          .insert({ has_accepted: false, days_visited: [] })
          .select()
          .single();

        if (insertError) {
          console.error('Error creating state:', insertError);
        } else if (newState) {
          setStateId(newState.id);
        }
      }
    } catch (err) {
      console.error('Error in loadState:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async () => {
    setHasAccepted(true);
    setView('calendar');

    if (stateId) {
      await supabase
        .from('valentine_state')
        .update({ has_accepted: true, updated_at: new Date().toISOString() })
        .eq('id', stateId);
    }
  };

  const handleDayClick = async (day: number) => {
    setSelectedDay(day);
    setView('day');

    if (!visitedDays.includes(day)) {
      const newVisitedDays = [...visitedDays, day];
      setVisitedDays(newVisitedDays);

      if (stateId) {
        await supabase
          .from('valentine_state')
          .update({
            days_visited: newVisitedDays,
            updated_at: new Date().toISOString(),
          })
          .eq('id', stateId);
      }
    }
  };

  const handleBackToCalendar = () => {
    setView('calendar');
    setSelectedDay(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-red-200 to-rose-300 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-red-500 mx-auto mb-4 fill-red-500 animate-pulse" />
          <p className="text-2xl font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (view === 'proposal') {
    return <ProposalPage onAccept={handleAccept} />;
  }

  if (view === 'day' && selectedDay) {
    return <DayPage day={selectedDay} onBack={handleBackToCalendar} />;
  }

  return <CalendarPage onDayClick={handleDayClick} visitedDays={visitedDays} />;
}

export default App;
