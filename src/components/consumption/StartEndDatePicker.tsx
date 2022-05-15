import { DateRangePicker } from '@mantine/dates';
import TimeRange from '../../model/TimeRange';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { Box } from '@mantine/core';

dayjs.extend(localizedFormat);

type StartEndDatePickerProps = {
  timeRange: TimeRange;
  changeTimeRange: (value: TimeRange) => void;
};

function StartEndDatePicker({ timeRange, changeTimeRange }: StartEndDatePickerProps) {
  const startDate = dayjs(timeRange.start_time).toDate();
  const endDate = dayjs(timeRange.end_time).toDate();
  const timeRangeTuple: [Date, Date] = [startDate, endDate];

  return (
    <Box>
      <DateRangePicker
        label="Start - End"
        placeholder="Pick date"
        value={timeRangeTuple}
        range={timeRangeTuple}
        inputFormat="L"
        maxDate={dayjs().endOf('day').toDate()}
        onChange={(tuple) => {
          changeTimeRange({
            start_time: dayjs(tuple[0]).format(),
            end_time: dayjs(tuple[1]).format(),
          });
        }}
        clearable={false}
        required
      />
    </Box>
  );
}

export default StartEndDatePicker;
