<template>
  <div class="w-[900px] bg-white rounded-3xl border border-gray-200 shadow-sm p-6" dir="rtl">
    <!-- Header with nights count and date range -->
    <div class="flex justify-between items-start mb-6">
      <div>
        <h2 class="text-3xl font-bold text-gray-900 mb-1">{{ nightsCount }} شب</h2>
        <p class="text-gray-500 text-lg">{{ formatDateRange }}</p>
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
      <button @click="nextMonth" class="text-gray-900 hover:text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <div class="flex-1"></div>
      
      <button @click="previousMonth" class="text-gray-400 hover:text-gray-600">
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
            :key="date.format('YYYY-MM-DD')"
            class="text-center relative h-10 flex items-center justify-center cursor-pointer transition-colors duration-200"
            :class="{
              'text-gray-300 cursor-not-allowed': isPastDate(date),
              'text-gray-900 hover:bg-gray-100': !isPastDate(date) && !isSelected(date) && !isInRange(date) && isDateInMonth(date, firstMonth),
              'text-gray-400': !isDateInMonth(date, firstMonth),
              'text-white': isSelected(date),
              'bg-gray-100': isInRange(date)
            }"
            @click="!isPastDate(date) && selectDate(date)"
          >
            <div 
              v-if="isSelected(date)"
              class="absolute inset-0 flex items-center justify-center"
            >
              <div class="h-10 w-10 rounded-full bg-black"></div>
            </div>
            <div
              v-else-if="isInRange(date)"
              class="absolute inset-0 flex items-center justify-center"
            >
              <div class="h-10 w-full bg-gray-100"></div>
            </div>
            <span class="relative z-10">{{ date.jDate() }}</span>
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
            :key="date.format('YYYY-MM-DD')"
            class="text-center relative h-10 flex items-center justify-center cursor-pointer transition-colors duration-200"
            :class="{
              'text-gray-300 cursor-not-allowed': isPastDate(date),
              'text-gray-900 hover:bg-gray-100': !isPastDate(date) && !isSelected(date) && !isInRange(date) && isDateInMonth(date, secondMonth),
              'text-gray-400': !isDateInMonth(date, secondMonth),
              'text-white': isSelected(date),
              'bg-gray-100': isInRange(date)
            }"
            @click="!isPastDate(date) && selectDate(date)"
          >
            <div 
              v-if="isSelected(date)"
              class="absolute inset-0 flex items-center justify-center"
            >
              <div class="h-10 w-10 rounded-full bg-black"></div>
            </div>
            <div
              v-else-if="isInRange(date)"
              class="absolute inset-0 flex items-center justify-center"
            >
              <div class="h-10 w-full bg-gray-100"></div>
            </div>
            <span class="relative z-10">{{ date.jDate() }}</span>
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
}>();

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'dates-selected', dates: { checkIn: Date; checkOut: Date }): void
}>();

const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
const currentDate = moment();
const firstMonth = ref(currentDate.clone());
const secondMonth = ref(currentDate.clone().add(1, 'jMonth'));

const checkInDate = ref<moment.Moment | null>(null);
const checkOutDate = ref<moment.Moment | null>(null);

// Initialize dates from props
onMounted(() => {
  if (props.initialCheckIn) {
    checkInDate.value = moment(props.initialCheckIn);
  }
  if (props.initialCheckOut) {
    checkOutDate.value = moment(props.initialCheckOut);
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

function generateMonthDates(date: moment.Moment) {
  const dates: moment.Moment[] = [];
  const firstDay = date.clone().startOf('jMonth');
  const lastDay = date.clone().endOf('jMonth');
  
  // Add days from previous month
  const firstDayOfWeek = firstDay.day();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    dates.push(firstDay.clone().subtract(i + 1, 'days'));
  }
  
  // Add days of current month
  for (let i = 0; i < lastDay.jDate(); i++) {
    dates.push(firstDay.clone().add(i, 'days'));
  }
  
  // Add days from next month
  const remainingDays = 42 - dates.length; // 6 rows * 7 days = 42
  for (let i = 1; i <= remainingDays; i++) {
    dates.push(lastDay.clone().add(i, 'days'));
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
  if (!checkInDate.value) return false;
  if (!checkOutDate.value) return date.isSame(checkInDate.value);
  return date.isSame(checkInDate.value) || date.isSame(checkOutDate.value);
}

function selectDate(date: moment.Moment): void {
  if (!checkInDate.value || (checkInDate.value && checkOutDate.value)) {
    // First selection or new selection after both dates were selected
    checkInDate.value = date;
    checkOutDate.value = null;
  } else {
    // Second selection
    if (date.isBefore(checkInDate.value)) {
      // If selected date is before check-in, make it the new check-in
      checkInDate.value = date;
      checkOutDate.value = null;
    } else {
      // If selected date is after check-in, set it as check-out
      checkOutDate.value = date;
      // Only emit the dates, don't close the calendar
      emit('dates-selected', {
        checkIn: checkInDate.value.toDate(),
        checkOut: checkOutDate.value.toDate()
      });
    }
  }
}

function clearDates(): void {
  checkInDate.value = null;
  checkOutDate.value = null;
}

function clearCheckIn(): void {
  checkInDate.value = null;
  checkOutDate.value = null;
}

function clearCheckOut(): void {
  checkOutDate.value = null;
}

function previousMonth(): void {
  firstMonth.value.subtract(1, 'jMonth');
  secondMonth.value.subtract(1, 'jMonth');
}

function nextMonth(): void {
  firstMonth.value.add(1, 'jMonth');
  secondMonth.value.add(1, 'jMonth');
}

function close(): void {
  emit('close');
}

function isPastDate(date: moment.Moment): boolean {
  return date.isBefore(moment().startOf('day'));
}

function isInRange(date: moment.Moment): boolean {
  if (!checkInDate.value || !checkOutDate.value) return false;
  return date.isBetween(checkInDate.value, checkOutDate.value, 'day', '[]');
}
</script> 