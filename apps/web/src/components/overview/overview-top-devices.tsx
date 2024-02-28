'use client';

import { ChartSwitch } from '@/components/report/chart';
import { useEventQueryFilters } from '@/hooks/useEventQueryFilters';
import { cn } from '@/utils/cn';

import { Widget, WidgetBody } from '../Widget';
import { WidgetButtons, WidgetHead } from './overview-widget';
import { useOverviewOptions } from './useOverviewOptions';
import { useOverviewWidget } from './useOverviewWidget';

interface OverviewTopDevicesProps {
  projectId: string;
}
export default function OverviewTopDevices({
  projectId,
}: OverviewTopDevicesProps) {
  const { interval, range, previous, startDate, endDate } =
    useOverviewOptions();
  const [filters, setFilter] = useEventQueryFilters();
  const [widget, setWidget, widgets] = useOverviewWidget('tech', {
    devices: {
      title: 'Top devices',
      btn: 'Devices',
      chart: {
        projectId,
        startDate,
        endDate,
        events: [
          {
            segment: 'user',
            filters,
            id: 'A',
            name: 'session_start',
          },
        ],
        breakdowns: [
          {
            id: 'A',
            name: 'device',
          },
        ],
        chartType: 'bar',
        lineType: 'monotone',
        interval: interval,
        name: 'Top sources',
        range: range,
        previous: previous,
        metric: 'sum',
      },
    },
    browser: {
      title: 'Top browser',
      btn: 'Browser',
      chart: {
        projectId,
        startDate,
        endDate,
        events: [
          {
            segment: 'user',
            filters,
            id: 'A',
            name: 'session_start',
          },
        ],
        breakdowns: [
          {
            id: 'A',
            name: 'browser',
          },
        ],
        chartType: 'bar',
        lineType: 'monotone',
        interval: interval,
        name: 'Top sources',
        range: range,
        previous: previous,
        metric: 'sum',
      },
    },
    browser_version: {
      title: 'Top Browser Version',
      btn: 'Browser Version',
      chart: {
        projectId,
        startDate,
        endDate,
        events: [
          {
            segment: 'user',
            filters,
            id: 'A',
            name: 'session_start',
          },
        ],
        breakdowns: [
          {
            id: 'A',
            name: 'browser_version',
          },
        ],
        chartType: 'bar',
        lineType: 'monotone',
        interval: interval,
        name: 'Top sources',
        range: range,
        previous: previous,
        metric: 'sum',
      },
    },
    os: {
      title: 'Top OS',
      btn: 'OS',
      chart: {
        projectId,
        startDate,
        endDate,
        events: [
          {
            segment: 'user',
            filters,
            id: 'A',
            name: 'session_start',
          },
        ],
        breakdowns: [
          {
            id: 'A',
            name: 'os',
          },
        ],
        chartType: 'bar',
        lineType: 'monotone',
        interval: interval,
        name: 'Top sources',
        range: range,
        previous: previous,
        metric: 'sum',
      },
    },
    os_version: {
      title: 'Top OS version',
      btn: 'OS Version',
      chart: {
        projectId,
        startDate,
        endDate,
        events: [
          {
            segment: 'user',
            filters,
            id: 'A',
            name: 'session_start',
          },
        ],
        breakdowns: [
          {
            id: 'A',
            name: 'os_version',
          },
        ],
        chartType: 'bar',
        lineType: 'monotone',
        interval: interval,
        name: 'Top sources',
        range: range,
        previous: previous,
        metric: 'sum',
      },
    },
  });

  return (
    <>
      <Widget className="col-span-6 md:col-span-3">
        <WidgetHead>
          <div className="title">{widget.title}</div>
          <WidgetButtons>
            {widgets.map((w) => (
              <button
                key={w.key}
                onClick={() => setWidget(w.key)}
                className={cn(w.key === widget.key && 'active')}
              >
                {w.btn}
              </button>
            ))}
          </WidgetButtons>
        </WidgetHead>
        <WidgetBody>
          <ChartSwitch
            hideID
            {...{
              projectId,
              startDate,
              endDate,
              events: [
                {
                  segment: 'user',
                  filters,
                  id: 'A',
                  name: 'session_start',
                },
              ],
              breakdowns: [
                {
                  id: 'A',
                  name: 'browser_version',
                },
              ],
              chartType: 'bar',
              lineType: 'monotone',
              interval: interval,
              name: 'Top sources',
              range: range,
              previous: previous,
              metric: 'sum',
            }}
          />
        </WidgetBody>
      </Widget>
    </>
  );
}
