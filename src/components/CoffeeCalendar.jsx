// In HomeComponent.jsx, add this import at the top:
import CoffeeCalendar from './CoffeeCalendar';

// Then replace the old Coffee Session Modal with:
{showCoffeeModal && (
  <CoffeeCalendar 
    onClose={() => setShowCoffeeModal(false)}
    onSchedule={(bookingData) => {
      console.log('Booking confirmed:', bookingData);
      // Here you can send to your backend or email service
    }}
  />
)}