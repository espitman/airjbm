<template>
  <div class="w-[900px] bg-white rounded-3xl border border-gray-200 shadow-sm p-6" dir="rtl">
    <!-- Header with nights count and date range -->
    <div class="flex justify-between items-start mb-6">
      <div>
        <h2 class="text-3xl font-bold text-gray-900 mb-1">{{ nightsCount }} شب</h2>
      </div>
      
      <!-- Check-in/Check-out inputs -->
      <div class="flex space-x-4 space-x-reverse">
        <div class="relative">
          <div class="border border-gray-800 rounded-xl p-2 w-44">
            <div class="text-xs font-medium text-gray-700 mb-1">ورود</div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-900">{{ formatDate(checkInDate) }}</span>
              <button @click="clearCheckIn" class="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div class="relative">
          <div class="border border-gray-200 rounded-xl p-2 w-44">
            <div class="text-xs font-medium text-gray-700 mb-1">خروج</div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-900">{{ formatDate(checkOutDate) }}</span>
              <button @click="clearCheckOut" class="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Calendar navigation -->
    <div class="flex justify-between items-center mb-6">
      <button 
        @click="previousMonths" 
        :class="[
          'text-gray-400 hover:text-gray-600 transition-colors',
          { 'opacity-30 cursor-not-allowed': !canGoPrevious }
        ]"
        :disabled="!canGoPrevious"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <div class="flex-1"></div>
      
      <button 
        @click="nextMonths" 
        :class="[
          'text-gray-400 hover:text-gray-600 transition-colors',
          { 'opacity-30 cursor-not-allowed': !canGoNext }
        ]"
        :disabled="!canGoNext"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
    
    <!-- Calendar grid -->
    <div class="flex space-x-8 space-x-reverse">
      <!-- First Month -->
      <div class="flex-1 min-w-[380px]">
        <h3 class="text-xl font-medium text-gray-900 text-center mb-4">{{ formatMonthYear(firstMonth) }}</h3>
        <div class="grid grid-cols-7 mb-2">
          <div v-for="day in weekDays" :key="day" class="text-center text-gray-500 font-medium">{{ day }}</div>
        </div>
        
        <div class="grid grid-cols-7 gap-y-4">
          <div 
            v-for="date in firstMonthDates" 
            :key="date ? date.format('YYYY-MM-DD') : 'empty'"
            class="text-center relative h-10 flex items-center justify-center cursor-pointer transition-colors duration-200"
            :class="{
              'text-gray-300 cursor-not-allowed': date && isPastDate(date),
              'text-gray-900 hover:bg-gray-100': date && !isPastDate(date) && !isSelected(date) && !isInRange(date) && isDateInMonth(date, firstMonth),
              'text-gray-400': !date || (date && !isDateInMonth(date, firstMonth)),
              'text-white': date && isSelected(date),
              'bg-gray-100': date && isInRange(date)
            }"
            @click="date && !isPastDate(date) && selectDate(date)"
          >
            <div 
              v-if="date && isSelected(date)"
              class="absolute inset-0 flex items-center justify-center"
            >
              <div class="h-10 w-10 rounded-full bg-black"></div>
            </div>
            <div
              v-else-if="date && isInRange(date)"
              class="absolute inset-0 flex items-center justify-center"
            >
              <div class="h-10 w-full bg-gray-100"></div>
            </div>
            <div class="relative z-10 flex flex-col items-center">
              <span v-if="date">{{ date.jDate() }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Second Month -->
      <div class="flex-1 min-w-[380px]">
        <h3 class="text-xl font-medium text-gray-900 text-center mb-4">{{ formatMonthYear(secondMonth) }}</h3>
        <div class="grid grid-cols-7 mb-2">
          <div v-for="day in weekDays" :key="day" class="text-center text-gray-500 font-medium">{{ day }}</div>
        </div>
        
        <div class="grid grid-cols-7 gap-y-4">
          <div 
            v-for="date in secondMonthDates" 
            :key="date ? date.format('YYYY-MM-DD') : 'empty'"
            class="text-center relative h-10 flex items-center justify-center cursor-pointer transition-colors duration-200"
            :class="{
              'text-gray-300 cursor-not-allowed': date && isPastDate(date),
              'text-gray-900 hover:bg-gray-100': date && !isPastDate(date) && !isSelected(date) && !isInRange(date) && isDateInMonth(date, secondMonth),
              'text-gray-400': !date || (date && !isDateInMonth(date, secondMonth)),
              'text-white': date && isSelected(date),
              'bg-gray-100': date && isInRange(date)
            }"
            @click="date && !isPastDate(date) && selectDate(date)"
          >
            <div 
              v-if="date && isSelected(date)"
              class="absolute inset-0 flex items-center justify-center"
            >
              <div class="h-10 w-10 rounded-full bg-black"></div>
            </div>
            <div
              v-else-if="date && isInRange(date)"
              class="absolute inset-0 flex items-center justify-center"
            >
              <div class="h-10 w-full bg-gray-100"></div>
            </div>
            <div class="relative z-10 flex flex-col items-center">
              <span v-if="date">{{ date.jDate() }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer buttons -->
    <div class="flex justify-end mt-8">
      <div class="flex space-x-4 space-x-reverse">
        <button @click="clearDates" class="text-gray-900 font-medium hover:underline">پاک کردن تاریخ‌ها</button>
        <button @click="close" class="bg-gray-900 text-white font-medium px-6 py-3 rounded-xl hover:bg-gray-800">بستن</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import moment from 'moment-jalaali';

const props = defineProps<{
  initialCheckIn?: Date;
  initialCheckOut?: Date;
  calendar?: {
    date: string;
    price: number;
    status: string;
    discount?: number;
    jabamaDiscount?: number;
  }[];
}>();

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'dates-selected', dates: { checkIn: Date; checkOut: Date }): void
  (e: 'dates-cleared'): void
}>();

const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
const currentDate = moment();
const firstMonth = ref(currentDate.clone());
const secondMonth = ref(currentDate.clone().add(1, 'jMonth'));

const checkInDate = ref<moment.Moment | null>(null);
const checkOutDate = ref<moment.Moment | null>(null);

// Initialize dates from props
onMounted(() => {
  // Initialize selected dates if provided
  if (props.initialCheckIn) {
    checkInDate.value = moment(props.initialCheckIn);
  }
  if (props.initialCheckOut) {
    checkOutDate.value = moment(props.initialCheckOut);
  }
  
  // If we have selected dates, show the page containing the selected month
  const selectedMonth = checkOutDate.value || checkInDate.value;
  if (selectedMonth) {
    // Calculate which page to show based on the selected month
    const selectedMonthNumber = selectedMonth.jMonth();
    const currentMonthNumber = currentDate.jMonth();
    
    // Calculate the difference in months
    let monthDiff = selectedMonthNumber - currentMonthNumber;
    
    // Adjust for year difference
    if (selectedMonth.jYear() !== currentDate.jYear()) {
      monthDiff += (selectedMonth.jYear() - currentDate.jYear()) * 12;
    }
    
    // Calculate which page to show (each page has 2 months)
    const pageNumber = Math.floor(monthDiff / 2);
    
    // Set the first and second months based on the page number
    firstMonth.value = currentDate.clone().add(pageNumber * 2, 'jMonth');
    secondMonth.value = firstMonth.value.clone().add(1, 'jMonth');
    
    // Force a re-render of the calendar to ensure the selected dates are properly displayed
    setTimeout(() => {
      // This will trigger a re-render of the calendar
      const temp = firstMonth.value.clone();
      firstMonth.value = secondMonth.value.clone();
      secondMonth.value = temp;
      
      // Then set them back to the correct values
      setTimeout(() => {
        firstMonth.value = currentDate.clone().add(pageNumber * 2, 'jMonth');
        secondMonth.value = firstMonth.value.clone().add(1, 'jMonth');
      }, 0);
    }, 0);
  } else {
    // If no dates selected, show current month and next month
    firstMonth.value = currentDate.clone();
    secondMonth.value = currentDate.clone().add(1, 'jMonth');
  }
});

const formatDateRange = computed(() => {
  if (!checkInDate.value || !checkOutDate.value) return '';
  return `${formatDate(checkInDate.value)} - ${formatDate(checkOutDate.value)}`;
});

const nightsCount = computed(() => {
  if (!checkInDate.value || !checkOutDate.value) return 0;
  return checkOutDate.value.diff(checkInDate.value, 'days');
});

const firstMonthDates = computed(() => generateMonthDates(firstMonth.value));
const secondMonthDates = computed(() => generateMonthDates(secondMonth.value));

const canGoPrevious = computed(() => {
  const newFirstMonth = firstMonth.value.clone().subtract(2, 'jMonth');
  return !newFirstMonth.isBefore(currentDate, 'month');
});

const canGoNext = computed(() => {
  const newSecondMonth = secondMonth.value.clone().add(2, 'jMonth');
  return !newSecondMonth.isAfter(currentDate.clone().add(4, 'month'), 'month');
});

function generateMonthDates(date: moment.Moment) {
  const dates: moment.Moment[] = [];
  const firstDay = date.clone().startOf('jMonth');
  const lastDay = date.clone().endOf('jMonth');
  
  // Add empty slots for days before the first day of the month
  const firstDayOfWeek = firstDay.day();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    dates.push(null);
  }
  
  // Add days of current month
  for (let i = 0; i < lastDay.jDate(); i++) {
    dates.push(firstDay.clone().add(i, 'days'));
  }
  
  // Add empty slots for remaining days to complete the grid
  const remainingDays = 42 - dates.length; // 6 rows * 7 days = 42
  for (let i = 0; i < remainingDays; i++) {
    dates.push(null);
  }
  
  return dates;
}

function formatDate(date: moment.Moment | null): string {
  if (!date) return '';
  const monthNames = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
  return `${date.jDate()} ${monthNames[date.jMonth()]} ${date.jYear()}`;
}

function formatMonthYear(date: moment.Moment): string {
  const monthNames = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
  return `${monthNames[date.jMonth()]} ${date.jYear()}`;
}

function isDateInMonth(date: moment.Moment, month: moment.Moment): boolean {
  return date.jMonth() === month.jMonth() && date.jYear() === month.jYear();
}

function isSelected(date: moment.Moment): boolean {
  if (!date) return false;
  if (!checkInDate.value) return false;
  if (!checkOutDate.value) return date.isSame(checkInDate.value, 'day');
  return date.isSame(checkInDate.value, 'day') || date.isSame(checkOutDate.value, 'day');
}

function selectDate(date: moment.Moment): void {
  if (!checkInDate.value || (checkInDate.value && checkOutDate.value)) {
    // First selection or new selection after both dates were selected
    checkInDate.value = date;
    checkOutDate.value = null;
    
    // Navigate to the selected month if it's not in the current view
    if (!isDateInCurrentView(date)) {
      navigateToSelectedMonth(date);
    }
  } else {
    // Second selection
    if (date.isBefore(checkInDate.value)) {
      // If selected date is before check-in, make it the new check-in
      checkInDate.value = date;
      checkOutDate.value = null;
      
      // Navigate to the selected month if it's not in the current view
      if (!isDateInCurrentView(date)) {
        navigateToSelectedMonth(date);
      }
    } else {
      // If selected date is after or same as check-in, set it as check-out
      checkOutDate.value = date;
      
      // Only emit the dates, don't close the calendar
      emit('dates-selected', {
        checkIn: checkInDate.value.toDate(),
        checkOut: checkOutDate.value.toDate()
      });
      
      // Navigate to the selected month if it's not in the current view
      if (!isDateInCurrentView(date)) {
        navigateToSelectedMonth(date);
      }
    }
  }
}

function isDateInCurrentView(date: moment.Moment): boolean {
  return (
    (date.jMonth() === firstMonth.value.jMonth() && date.jYear() === firstMonth.value.jYear()) ||
    (date.jMonth() === secondMonth.value.jMonth() && date.jYear() === secondMonth.value.jYear())
  );
}

function navigateToSelectedMonth(date: moment.Moment): void {
  // Calculate how many months we need to move
  const currentFirstMonth = firstMonth.value.clone();
  const targetMonth = date.clone().startOf('jMonth');
  
  // Calculate the difference in months
  const monthDiff = targetMonth.diff(currentFirstMonth, 'jMonth');
  
  // If we need to go forward
  if (monthDiff > 0) {
    // Calculate how many times we need to click next
    const clicksNeeded = Math.floor(monthDiff / 2);
    for (let i = 0; i < clicksNeeded; i++) {
      nextMonths();
    }
  }
  // If we need to go backward
  else if (monthDiff < 0) {
    // Calculate how many times we need to click previous
    const clicksNeeded = Math.floor(Math.abs(monthDiff) / 2);
    for (let i = 0; i < clicksNeeded; i++) {
      previousMonths();
    }
  }
}

function clearDates(): void {
  checkInDate.value = null;
  checkOutDate.value = null;
  emit('dates-cleared');
}

function clearCheckIn(): void {
  checkInDate.value = null;
  checkOutDate.value = null;
}

function clearCheckOut(): void {
  checkOutDate.value = null;
  // Only emit dates-cleared if there was a check-in date that's now being cleared
  if (checkInDate.value) {
    checkInDate.value = null;
    emit('dates-cleared');
  }
}

function previousMonths(): void {
  if (!canGoPrevious.value) return;
  
  const newFirstMonth = firstMonth.value.clone().subtract(2, 'jMonth');
  const newSecondMonth = secondMonth.value.clone().subtract(2, 'jMonth');
  
  firstMonth.value = newFirstMonth;
  secondMonth.value = newSecondMonth;
}

function nextMonths(): void {
  if (!canGoNext.value) return;
  
  const newFirstMonth = firstMonth.value.clone().add(2, 'jMonth');
  const newSecondMonth = secondMonth.value.clone().add(2, 'jMonth');
  
  firstMonth.value = newFirstMonth;
  secondMonth.value = newSecondMonth;
}

function close(): void {
  emit('close');
}

function isPastDate(date: moment.Moment): boolean {
  const dateStr = date.format('YYYY-MM-DD');
  const calendarDate = calendarDates.value.get(dateStr);
  
  // If we have a check-in date, handle the special rules
  if (checkInDate.value) {
    // If we have a check-out date, all days between them should be active
    if (checkOutDate.value) {
      if (date.isBetween(checkInDate.value, checkOutDate.value, 'day', '[]')) {
        return false;
      }
    } else {
      // If we only have check-in date, find the first inactive day
      let firstInactiveDay = null;
      let currentDate = checkInDate.value.clone();
      
      while (true) {
        const currentDateStr = currentDate.format('YYYY-MM-DD');
        const currentCalendarDate = calendarDates.value.get(currentDateStr);
        
        if (currentCalendarDate && !currentCalendarDate.isAvailable) {
          firstInactiveDay = currentDate.clone();
          break;
        }
        currentDate.add(1, 'day');
      }
      
      // Make the first inactive day active
      if (firstInactiveDay && date.isSame(firstInactiveDay, 'day')) {
        return false;
      }
      
      // Make all days after the first inactive day inactive
      if (firstInactiveDay && date.isAfter(firstInactiveDay, 'day')) {
        return true;
      }
      
      // Make the check-in day not selectable for check-out
      if (date.isSame(checkInDate.value, 'day')) {
        return true;
      }
    }
  }
  
  return date.isBefore(currentDate, 'day') || (calendarDate && !calendarDate.isAvailable);
}

function isInRange(date: moment.Moment): boolean {
  if (!checkInDate.value || !checkOutDate.value) return false;
  return date.isBetween(checkInDate.value, checkOutDate.value, 'day', '[]');
}

// Add new computed properties for calendar data
const calendarDates = computed(() => {
  if (!props.calendar) return new Map();
  return new Map(
    props.calendar.map(date => [
      moment(date.date).format('YYYY-MM-DD'),
      { price: date.price, isAvailable: date.status === 'available' }
    ])
  );
});

// Add function to get price for a date
function getDatePrice(date: moment.Moment) {
  const dateStr = date.format('YYYY-MM-DD');
  return calendarDates.value.get(dateStr)?.price;
}

// Add price formatting function
function formatPrice(price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
</script> 