'use client'

import { useId, useState } from 'react'
import { REPORT_CATEGORIES, REPORT_SEVERITIES } from '../constants'
import { MediaPlaceholder } from './media-placeholder'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

const ImageIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
)

const VideoIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.934a.5.5 0 0 0-.777-.416L16 11" />
    <rect x="2" y="6" width="14" height="12" rx="2" />
  </svg>
)

const MapIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

/**
 * Create Report form — UI only (Sprint 2.1). Holds local state for the
 * interactive controls; submission is intentionally not wired up yet, so the
 * submit button stays disabled.
 */
export function CreateReportForm() {
  const [severity, setSeverity] = useState<string>('medium')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const severityLegendId = useId()
  const anonymousLabelId = useId()
  const anonymousDescId = useId()

  return (
    <form className="space-y-6" noValidate>
      {/* Title */}
      <div className="space-y-1.5">
        <Label htmlFor="title">Report title</Label>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="e.g. Large pothole on Main Street"
          maxLength={120}
          required
        />
      </div>

      {/* Category */}
      <div className="space-y-1.5">
        <Label htmlFor="category">Category</Label>
        <Select id="category" name="category" defaultValue="" required>
          <option value="" disabled>
            Select a category
          </option>
          {REPORT_CATEGORIES.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </Select>
      </div>

      {/* Severity */}
      <fieldset className="space-y-2" aria-labelledby={severityLegendId}>
        <legend id={severityLegendId} className="text-sm font-medium">
          Severity
        </legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {REPORT_SEVERITIES.map((option) => {
            const selected = severity === option.value
            return (
              <label
                key={option.value}
                className={cn(
                  'flex cursor-pointer items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors focus-within:ring-2 focus-within:ring-primary focus-within:outline-none',
                  selected
                    ? option.selectedClasses
                    : 'border-border text-foreground hover:bg-foreground/5',
                )}
              >
                <input
                  type="radio"
                  name="severity"
                  value={option.value}
                  checked={selected}
                  onChange={() => setSeverity(option.value)}
                  className="sr-only"
                />
                <span className={cn('h-2 w-2 rounded-full', option.dotClasses)} aria-hidden="true" />
                {option.label}
              </label>
            )
          })}
        </div>
      </fieldset>

      {/* Description */}
      <div className="space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe the issue, when you noticed it, and any details that would help responders."
          rows={5}
          required
        />
        <p className="text-xs text-muted-foreground">
          Be specific and factual. Avoid sharing personal information about others.
        </p>
      </div>

      {/* Address */}
      <div className="space-y-1.5">
        <Label htmlFor="address">Address / location</Label>
        <Input
          id="address"
          name="address"
          type="text"
          placeholder="Street, area, or nearest landmark"
          autoComplete="street-address"
        />
      </div>

      {/* Media + map placeholders */}
      <div className="space-y-2">
        <span className="text-sm font-medium">Attachments &amp; location</span>
        <div className="grid gap-3 sm:grid-cols-2">
          <MediaPlaceholder
            icon={ImageIcon}
            title="Add photos"
            description="Image uploads will be available in an upcoming update."
          />
          <MediaPlaceholder
            icon={VideoIcon}
            title="Add video"
            description="Video uploads will be available in an upcoming update."
          />
        </div>
        <MediaPlaceholder
          icon={MapIcon}
          title="Pin location on map"
          description="An interactive map for pinpointing the exact location is on the way."
          tall
        />
      </div>

      {/* Anonymous switch */}
      <div className="flex items-start justify-between gap-4 rounded-lg border border-border p-4">
        <div className="space-y-0.5">
          <span id={anonymousLabelId} className="text-sm font-medium">
            Submit anonymously
          </span>
          <p id={anonymousDescId} className="text-xs text-muted-foreground">
            Your name won&apos;t be attached to this report. You may not receive status updates.
          </p>
        </div>
        <Switch
          checked={isAnonymous}
          onCheckedChange={setIsAnonymous}
          aria-labelledby={anonymousLabelId}
          aria-describedby={anonymousDescId}
        />
      </div>

      {/* Terms acceptance */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="terms"
          name="terms"
          checked={acceptedTerms}
          onChange={(event) => setAcceptedTerms(event.target.checked)}
          className="mt-0.5"
        />
        <Label htmlFor="terms" className="font-normal text-muted-foreground">
          I confirm this report is accurate to the best of my knowledge and I accept the{' '}
          <span className="font-medium text-foreground underline underline-offset-2">
            terms of use
          </span>
          .
        </Label>
      </div>

      {/* Submit — intentionally disabled (no submit logic this sprint) */}
      <div className="space-y-2">
        <Button type="submit" className="w-full" disabled>
          Submit report
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Submitting reports will be enabled in a later sprint.
        </p>
      </div>
    </form>
  )
}
