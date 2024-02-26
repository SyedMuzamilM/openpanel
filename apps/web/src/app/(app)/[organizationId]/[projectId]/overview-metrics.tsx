'use client';

import { WidgetHead } from '@/components/overview/overview-widget';
import { useOverviewOptions } from '@/components/overview/useOverviewOptions';
import { ChartSwitch } from '@/components/report/chart';
import { Widget, WidgetBody } from '@/components/Widget';
import { useEventQueryFilters } from '@/hooks/useEventQueryFilters';
import { cn } from '@/utils/cn';

import type { IChartInput } from '@mixan/validation';

interface OverviewMetricsProps {
  projectId: string;
}

export default function OverviewMetrics({ projectId }: OverviewMetricsProps) {
  const { previous, range, interval, metric, setMetric, startDate, endDate } =
    useOverviewOptions();
  const [filters] = useEventQueryFilters();

  const reports = [
    {
      id: 'Visitors',
      projectId,
      startDate,
      endDate,
      events: [
        {
          segment: 'user',
          filters,
          id: 'A',
          name: 'session_start',
          displayName: 'Visitors',
        },
      ],
      breakdowns: [],
      chartType: 'metric',
      lineType: 'monotone',
      interval,
      name: 'Visitors',
      range,
      previous,
      metric: 'sum',
    },
    {
      id: 'Sessions',
      projectId,
      startDate,
      endDate,
      events: [
        {
          segment: 'event',
          filters,
          id: 'A',
          name: 'session_start',
          displayName: 'Sessions',
        },
      ],
      breakdowns: [],
      chartType: 'metric',
      lineType: 'monotone',
      interval,
      name: 'Sessions',
      range,
      previous,
      metric: 'sum',
    },
    {
      id: 'Pageviews',
      projectId,
      startDate,
      endDate,
      events: [
        {
          segment: 'event',
          filters,
          id: 'A',
          name: 'screen_view',
          displayName: 'Pageviews',
        },
      ],
      breakdowns: [],
      chartType: 'metric',
      lineType: 'monotone',
      interval,
      name: 'Pageviews',
      range,
      previous,
      metric: 'sum',
    },
    {
      id: 'Views per session',
      projectId,
      startDate,
      endDate,
      events: [
        {
          segment: 'user_average',
          filters,
          id: 'A',
          name: 'screen_view',
          displayName: 'Views per session',
        },
      ],
      breakdowns: [],
      chartType: 'metric',
      lineType: 'monotone',
      interval,
      name: 'Views per session',
      range,
      previous,
      metric: 'average',
    },
    {
      id: 'Bounce rate',
      projectId,
      startDate,
      endDate,
      events: [
        {
          segment: 'event',
          filters: [
            {
              id: '1',
              name: 'properties._bounce',
              operator: 'is',
              value: ['true'],
            },
            ...filters,
          ],
          id: 'A',
          name: 'session_end',
          displayName: 'Bounce rate',
        },
        {
          segment: 'event',
          filters: filters,
          id: 'B',
          name: 'session_end',
        },
      ],
      breakdowns: [],
      chartType: 'metric',
      lineType: 'monotone',
      interval,
      name: 'Bounce rate',
      range,
      previous,
      previousIndicatorInverted: true,
      formula: 'A/B*100',
      metric: 'average',
      unit: '%',
    },
    {
      id: 'Visit duration',
      projectId,
      startDate,
      endDate,
      events: [
        {
          segment: 'property_average',
          filters: [
            {
              name: 'duration',
              operator: 'isNot',
              value: ['0'],
              id: 'A',
            },
            ...filters,
          ],
          id: 'A',
          property: 'duration',
          name: 'screen_view',
          displayName: 'Visit duration',
        },
      ],
      breakdowns: [],
      chartType: 'metric',
      lineType: 'monotone',
      interval,
      name: 'Visit duration',
      range,
      previous,
      formula: 'A/1000/60',
      metric: 'average',
      unit: 'min',
    },
  ] satisfies (IChartInput & { id: string })[];

  const selectedMetric = reports[metric]!;

  return (
    <>
      {reports.map((report, index) => (
        <button
          key={index}
          className="relative col-span-6 md:col-span-3 lg:col-span-2 group"
          onClick={() => {
            setMetric(index);
          }}
        >
          <ChartSwitch hideID {...report} />
          <div
            className={cn(
              'transition-opacity top-0 left-0 right-0 bottom-0 absolute rounded-md w-full h-full border ring-1 border-chart-0 ring-chart-0',
              metric === index ? 'opacity-100' : 'opacity-0'
            )}
          />
          {/* add active border */}
        </button>
      ))}
      <Widget className="col-span-6">
        <WidgetHead>
          <div className="title">{selectedMetric.events[0]?.displayName}</div>
        </WidgetHead>
        <WidgetBody>
          <ChartSwitch
            key={selectedMetric.id}
            hideID
            {...selectedMetric}
            chartType="linear"
          />
        </WidgetBody>
      </Widget>
    </>
  );
}
