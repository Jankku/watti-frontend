import { DateRangePicker } from '@mantine/dates';
import TimeRange from '../../model/TimeRange';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { Box, useMantineTheme } from '@mantine/core';
import useBreakpoint from '../../hooks/useBreakpoint';
import isToday from 'dayjs/plugin/isToday';
import { Calendar } from 'tabler-icons-react';

dayjs.extend(localizedFormat);
dayjs.extend(isToday);

type StartEndDatePickerProps = {
  timeRange: TimeRange;
  changeTimeRange: (value: TimeRange) => void;
};

function StartEndDatePicker({ timeRange, changeTimeRange }: StartEndDatePickerProps) {
  const { colors } = useMantineTheme();
  const { matchesMd } = useBreakpoint();
  const startDate = dayjs(timeRange.start_time).toDate();
  const endDate = dayjs(timeRange.end_time).toDate();
  const timeRangeTuple: [Date, Date] = [startDate, endDate];

  return (
    <DateRangePicker
      required
      clearable={false}
      icon={<Calendar color={colors.orange[5]} />}
      dropdownType={matchesMd ? 'modal' : 'popover'}
      label="Start - End"
      placeholder="Pick date"
      value={timeRangeTuple}
      range={timeRangeTuple}
      inputFormat="L"
      maxDate={dayjs().endOf('day').toDate()}
      onChange={(tuple) => {
        if (dayjs(tuple[0]).isToday()) {
          const firstHourOfToday = dayjs().startOf('day').format();
          const currentHour = dayjs().format();
          changeTimeRange({
            start_time: firstHourOfToday,
            end_time: currentHour,
          });
        } else {
          changeTimeRange({
            start_time: dayjs(tuple[0]).format(),
            end_time: dayjs(tuple[1]).format(),
          });
        }
      }}
    />
  );
}

export default StartEndDatePicker;
