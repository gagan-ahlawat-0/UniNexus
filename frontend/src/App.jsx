import { Routes, Route } from 'react-router-dom';
import Dashboard1 from './pages/ClubManagement/Dashboard1';
import Dashboard2 from './pages/ClubManagement/Dashboard2';
import Discussion1Alt from './pages/community_discussion_1/Discussion1Alt';
import Discussion2 from './pages/community_discussion_2/Discussion2';
import Search1 from './pages/semantic_search_results_discovery_1/Search1';
import Search2 from './pages/semantic_search_results_discovery_2/Search2';
import Events1 from './pages/unified_event_feed_&_discovery_1/Events1';
import Events2 from './pages/unified_event_feed_&_discovery_2/Events2';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard1 />} />
      <Route path="/dashboard1" element={<Dashboard1 />} />
      <Route path="/dashboard2" element={<Dashboard2 />} />
      <Route path="/discussion1" element={<Discussion1Alt />} />
      <Route path="/discussion2" element={<Discussion2 />} />
      <Route path="/search1" element={<Search1 />} />
      <Route path="/search2" element={<Search2 />} />
      <Route path="/events1" element={<Events1 />} />
      <Route path="/events2" element={<Events2 />} />
      {/* Legacy routes for backward compatibility */}
      <Route path="/club-management-dashboard-1" element={<Dashboard1 />} />
      <Route path="/club-dashboard-1" element={<Dashboard1 />} />
      <Route path="/club-dashboard-2" element={<Dashboard2 />} />
      <Route path="/community" element={<Discussion1Alt />} />
      <Route path="/community-discussion-ai-summarizer-1" element={<Discussion1Alt />} />
      <Route path="/community-discussion-ai-summarizer-2" element={<Discussion2 />} />
      <Route path="/semantic-search-results-discovery-1" element={<Search1 />} />
      <Route path="/semantic-search-results-discovery-2" element={<Search2 />} />
      <Route path="/unified-event-feed-discovery-1" element={<Events1 />} />
      <Route path="/unified-event-feed-discovery-2" element={<Events2 />} />
    </Routes>
  );
}

export default App;