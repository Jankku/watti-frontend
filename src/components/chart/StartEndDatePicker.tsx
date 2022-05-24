import { DateRangePicker } from '@mantine/dates';
import TimeRange from '../../model/TimeRange';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { Box } from '@mantine/core';
import useBreakpoint from '../../hooks/useBreakpoint';
import { isToday } from '../../utils/timerangeutils';

dayjs.extend(localizedFormat);

type StartEndDatePickerProps = {
  timeRange: TimeRange;
  changeTimeRange: (value: TimeRange) => void;
};

function StartEndDatePicker({ timeRange, changeTimeRange }: StartEndDatePickerProps) {
  const { matchesMd } = useBreakpoint();
  const startDate = dayjs(timeRange.start_time).toDate();
  const endDate = dayjs(timeRange.end_time).toDate();
  const timeRangeTuple: [Date, Date] = [startDate, endDate];

  return (
    <Box>
      <DateRangePicker
        required
        clearable={false}
        dropdownType={matchesMd ? 'modal' : 'popover'}
        label="Start - End"
        placeholder="Pick date"
        value={timeRangeTuple}
        range={timeRangeTuple}
        inputFormat="L"
        maxDate={dayjs().endOf('day').toDate()}
        onChange={(tuple) => {
          if (isToday(tuple[0])) {
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
    </Box>
  );
}

export default StartEndDatePicker;
