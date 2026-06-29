/**
 * UI option lists for the Create Report form. Kept framework-agnostic and
 * separate from `types.ts` so the form and (later) validation share one source
 * of truth for the selectable values.
 */

export interface CategoryOption {
  value: string
  label: string
}

export const REPORT_CATEGORIES: CategoryOption[] = [
  { value: 'corruption', label: 'Corruption' },
  { value: 'road_damage', label: 'Road Damage' },
  { value: 'water_problem', label: 'Water Problem' },
  { value: 'electricity', label: 'Electricity' },
  { value: 'garbage', label: 'Garbage' },
  { value: 'crime', label: 'Crime' },
  { value: 'public_safety', label: 'Public Safety' },
  { value: 'environment', label: 'Environment' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'transport', label: 'Transport' },
  { value: 'other', label: 'Other' },
]

export interface SeverityOption {
  value: string
  label: string
  /** Tailwind classes applied when this option is selected. */
  selectedClasses: string
  /** Dot colour shown next to the label in every state. */
  dotClasses: string
}

export const REPORT_SEVERITIES: SeverityOption[] = [
  {
    value: 'low',
    label: 'Low',
    selectedClasses: 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
    dotClasses: 'bg-emerald-500',
  },
  {
    value: 'medium',
    label: 'Medium',
    selectedClasses: 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400',
    dotClasses: 'bg-amber-500',
  },
  {
    value: 'high',
    label: 'High',
    selectedClasses: 'border-orange-500 bg-orange-500/10 text-orange-700 dark:text-orange-400',
    dotClasses: 'bg-orange-500',
  },
  {
    value: 'critical',
    label: 'Critical',
    selectedClasses: 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-400',
    dotClasses: 'bg-red-500',
  },
]
