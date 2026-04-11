import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { X } from "lucide-react";
import { submitFeedback } from "@/api/feedback.api";
import { useAuth } from "@/context/useAuth";
type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type FormState = {
  subject: string;
  message: string;
  rating: number;
};

type FormErrors = {
  subject?: string;
  message?: string;
  rating?: string;
};

const initialForm: FormState = {
  subject: "",
  message: "",
  rating: 5,
};

export const FeedbackModal = ({ isOpen, onClose }: Props) => {
  const { user } = useAuth();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");

  const feedbackMutation = useMutation({
    mutationFn: submitFeedback,
    onSuccess: () => {
      setSuccessMessage("Feedback submitted successfully.");
      setForm(initialForm);
      setErrors({});
      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 1200);
    },
  });

  useEffect(() => {
    if (!isOpen) {
      setForm(initialForm);
      setErrors({});
      setSuccessMessage("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!form.subject.trim()) {
      nextErrors.subject = "Subject is required.";
    } else if (form.subject.trim().length < 3) {
      nextErrors.subject = "Subject must be at least 3 characters.";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Message is required.";
    } else if (form.message.trim().length < 10) {
      nextErrors.message = "Message must be at least 10 characters.";
    }

    if (form.rating < 1 || form.rating > 5) {
      nextErrors.rating = "Rating must be between 1 and 5.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!user?.id) {
      setErrors({
        subject: undefined,
        message: "You must be logged in to submit feedback.",
      });
      return;
    }

    if (!validate()) return;

    feedbackMutation.mutate({
      userId: user.id,
      subject: form.subject.trim(),
      message: form.message.trim(),
      rating: form.rating,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 sm:px-4">
      <div className="w-full max-sm:h-full max-w-xl sm:rounded-2xl bg-2card p-5 sm:p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold">Share Feedback</h2>
          <button
            type="button"
            onClick={onClose}
            className="bg-transparent p-1 hover:bg-btnHover"
          >
            <X className="size-5 text-white" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm text-trinary">Subject</label>
            <input
              type="text"
              placeholder="Enter feedback subject"
              value={form.subject}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, subject: e.target.value }))
              }
              className="w-full"
            />
            {errors.subject && (
              <p className="mt-1 text-xs text-error">{errors.subject}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm text-trinary">Message</label>
            <textarea
              placeholder="Write your feedback here"
              value={form.message}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, message: e.target.value }))
              }
              className="sm:min-h-[350px] w-full h-[270px]"
            />
            {errors.message && (
              <p className="mt-1 text-xs text-error">{errors.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm text-trinary">Rating</label>
            <select
              value={form.rating}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  rating: Number(e.target.value),
                }))
              }
              className="w-full"
            >
              <option value={5}>5 - Excellent</option>
              <option value={4}>4 - Good</option>
              <option value={3}>3 - Average</option>
              <option value={2}>2 - Poor</option>
              <option value={1}>1 - Very poor</option>
            </select>
            {errors.rating && (
              <p className="mt-1 text-xs text-error">{errors.rating}</p>
            )}
          </div>

          {successMessage && (
            <p className="text-sm text-success">{successMessage}</p>
          )}

          {feedbackMutation.isError && (
            <p className="text-sm text-error">
              Failed to submit feedback. Please try again.
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="flex-1">
            Cancel
          </button>
          <button
           className="w-3/4"
            type="button"
            onClick={handleSubmit}
            disabled={feedbackMutation.isPending}>
            {feedbackMutation.isPending ? "Submitting..." : "Submit Feedback"}
          </button>
        </div>
      </div>
    </div>
  );
};
