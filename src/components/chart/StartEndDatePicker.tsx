import { DateRangePicker } from '@mantine/dates';
import TimeRange from '../../model/TimeRange';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { useMantineTheme } from '@mantine/core';
import useBreakpoint from '../../hooks/useBreakpoint';
import isToday from 'dayjs/plugin/isToday';
import { Calendar } from 'tabler-icons-react';
import { useEffect, useState } from 'react';
import { isValidDateRange } from '../../utils/dateutils';

dayjs.extend(localizedFormat);
dayjs.extend(isToday);

export type DateTuple = [Date, Date];

type StartEndDatePickerProps = {
  dateRange: TimeRange;
  changeTimeRange: (value: TimeRange) => void;
};

function StartEndDatePicker({ dateRange, changeTimeRange }: StartEndDatePickerProps) {
  const { colors } = useMantineTheme();
  const { matchesMd } = useBreakpoint();

  const startDate = dayjs(dateRange.start_time).toDate();
  const endDate = dayjs(dateRange.end_time).toDate();
  const dateRangeTuple: DateTuple = [startDate, endDate];

  const [value, setValue] = useState<DateTuple>(dateRangeTuple);

  useEffect(() => {
    const range = {
      start_time: dayjs(value[0]).format(),
      end_time: dayjs(value[1]).format(),
    };

    if (isValidDateRange(range)) changeTimeRange(range);
  }, [changeTimeRange, value]);

  return (
    <DateRangePicker
      required
      clearable={false}
      icon={<Calendar color={colors.orange[5]} />}
      dropdownType={matchesMd ? 'modal' : 'popover'}
      label="Start - End"
      placeholder="Pick date"
      value={value}
      range={value}
      inputFormat="L"
      maxDate={dayjs().endOf('day').toDate()}
      onChange={(tuple) => {
        if (dayjs(tuple[0]).isToday()) {
          const firstHourOfToday = dayjs().startOf('day').toDate();
          const currentHour = dayjs().toDate();
          setValue([firstHourOfToday, currentHour]);
        } else {
          setValue([dayjs(tuple[0]).toDate(), dayjs(tuple[1]).toDate()]);
        }
      }}
    />
  );
}

export default StartEndDatePicker;
