"use client";

import { useState, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/custom/Mascot";
import {
  Download,
  Share2,
  Trophy,
  Award,
  Calendar,
  QrCode,
  CheckCircle,
  Star,
  Sparkles,
} from "lucide-react";
import { format } from "date-fns";
import html2canvas from "html2canvas";

interface CertificateProps {
  userName: string;
  courseTitle: string;
  completionDate?: Date;
  certificateId: string;
  onClose?: () => void;
  onNameChange?: (name: string) => void;
  courseDetails?: {
    difficulty?: string;
    topics?: string[];
    correctAnswers?: number;
    totalQuestions?: number;
  };
}

export function Certificate({
  userName = "Student Name",
  courseTitle,
  completionDate = new Date(),
  certificateId,
  onClose,
  onNameChange,
  courseDetails = {
    difficulty: "Intermediate",
    topics: ["AI Learning", "Personalized Education", "Interactive Content"],
    correctAnswers: undefined,
    totalQuestions: undefined,
  },
}: CertificateProps) {
  const [editableName, setEditableName] = useState(userName);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setEditableName(newName);
    onNameChange?.(newName);
  };

  const handleNameClick = () => {
    setIsEditing(true);
    // Focus the input field after a short delay to ensure the input is rendered
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 50);
  };

  const handleNameBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    }
    if (e.key === "Escape") {
      setEditableName(userName);
      e.currentTarget.blur();
    }
  };
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const formattedDate = format(completionDate, "MMMM d, yyyy");

  // Generate a QR code URL that would link to certificate verification
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://missnova.edu/verify/${certificateId}`;

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    try {
      setIsDownloading(true);

      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false,
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `${courseTitle
        .replace(/\s+/g, "-")
        .toLowerCase()}-certificate.png`;
      link.click();
    } catch (error) {
      console.error("Error generating certificate:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const shareCertificate = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${userName}'s Certificate of Completion`,
          text: `I just completed ${courseTitle} with Miss Nova!`,
          url: `https://missnova.edu/certificate/${certificateId}`,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert("Sharing is not supported in your browser");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-5xl">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold font-heading flex items-center">
              <Trophy className="h-6 w-6 mr-2 text-primary" />
              Your Achievement Certificate
            </h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={downloadCertificate}
                disabled={isDownloading}
                className="bg-white"
              >
                <Download className="h-4 w-4 mr-2" />
                {isDownloading ? "Processing..." : "Download"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={shareCertificate}
                className="bg-white"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>

          {/* Certificate Design - LANDSCAPE ORIENTATION */}
          <div
            ref={certificateRef}
            className="relative bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzQjgyRjYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NHgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')] p-0 rounded-xl overflow-hidden aspect-[1.7/1]"
          >
            {/* Gold Border */}
            <div className="border-[16px] border-double border-yellow-500/30 rounded-xl overflow-hidden h-full">
              {/* Certificate Inner Content with Gradient Background */}
              <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 p-8 relative h-full flex flex-col justify-between">
                {/* Decorative Corner Elements */}
                <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-primary/30 rounded-tl-xl"></div>
                <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-primary/30 rounded-tr-xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-primary/30 rounded-bl-xl"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-primary/30 rounded-br-xl"></div>

                {/* Decorative Ribbon
                <div className="absolute -top-1 -right-1 w-32 h-32 overflow-hidden">
                  <div className="absolute top-0 right-0 transform rotate-45 translate-y-16 -translate-x-6 w-40 text-center py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs font-bold shadow-md">
                    CERTIFIED
                  </div>
                </div> */}

                {/* Certificate Header */}
                <div className="text-center mb-2 relative">
                  <div className="flex justify-center items-center gap-6">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/30 to-yellow-600/30"></div>
                      <div className="relative z-10 bg-white rounded-full p-2 border-2 border-yellow-500/50 shadow-lg">
                        <Award className="h-16 w-16 text-yellow-600" />
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-full blur-sm"></div>
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold text-primary font-heading tracking-wide">
                        CERTIFICATE OF COMPLETION
                      </h1>
                    </div>
                  </div>

                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                </div>

                {/* Certificate Body - Main Content */}
                <div className="flex-1 flex flex-col justify-center items-center text-center relative z-10 py-2">
                  <p className="text-lg text-gray-600 font-body">
                    This is to certify that
                  </p>

                  <div
                    className="relative group cursor-pointer my-4"
                    onClick={!isEditing ? handleNameClick : undefined}
                  >
                    {!isEditing ? (
                      <>
                        <h2 className="text-3xl font-bold text-primary font-heading">
                          {editableName}
                        </h2>
                        <div className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            className="text-primary/60 hover:text-primary p-1 rounded-full hover:bg-primary/10 transition-colors"
                            title="Click to edit name"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                            </svg>
                          </button>
                        </div>
                      </>
                    ) : (
                      <input
                        ref={inputRef}
                        type="text"
                        value={editableName}
                        onChange={handleNameChange}
                        onBlur={handleNameBlur}
                        onKeyDown={handleKeyDown}
                        className="text-3xl font-bold text-primary font-heading bg-transparent border-b-2 border-primary outline-none text-center w-full"
                        aria-label="Edit name"
                      />
                    )}
                  </div>

                  <p className="text-lg text-gray-600 font-body mb-2">
                    has successfully completed the course
                  </p>

                  <div className="relative inline-block mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold font-heading text-secondary px-4 relative z-10">
                      {courseTitle}
                    </h3>
                    <div className="absolute bottom-1 left-0 right-0 h-3 bg-primary/20 -z-10 transform rotate-1"></div>
                  </div>

                  {/* Course Details - Horizontal Layout */}
                  <div className="flex justify-center gap-6 mb-4">
                    {courseDetails.correctAnswers !== undefined &&
                      courseDetails.totalQuestions !== undefined && (
                        <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 flex items-center">
                          <Star
                            className="h-4 w-4 text-yellow-500 mr-2"
                            fill="currentColor"
                          />
                          <span className="text-sm font-medium">
                            Score:{" "}
                            {(
                              (courseDetails.correctAnswers /
                                courseDetails.totalQuestions) *
                              100
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                      )}

                    <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 flex items-center">
                      <Calendar className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm font-medium">
                        Completed: {formattedDate}
                      </span>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 flex items-center">
                      <Sparkles className="h-4 w-4 text-secondary mr-2" />
                      <span className="text-sm font-medium">
                        {courseDetails.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Topics Covered - Horizontal */}
                  <div className="mb-2">
                    <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2 font-heading">
                      Topics Covered
                    </h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {courseDetails.topics?.map((topic, index) => (
                        <div
                          key={index}
                          className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/10 flex items-center"
                        >
                          <CheckCircle className="h-3 w-3 text-secondary mr-1" />
                          <span className="text-xs font-medium">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Signature and Seal - Horizontal Layout */}
                <div className="flex justify-between items-center mt-2 px-8">
                  <div className="text-center">
                    <div className="border-b-2 border-gray-400 pb-1 mb-1 w-40">
                      <div className="font-cederville text-[26px] text-primary">
                        Nova
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">AI Instructor</div>
                  </div>

                  <div className="text-center">
                    <div className="bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
                      <img
                        src={qrCodeUrl || "/placeholder.svg"}
                        alt="Certificate verification QR code"
                        className="w-16 h-16 mb-1 mx-auto"
                      />
                    </div>
                    <div className="text-xs text-gray-600 flex items-center justify-center">
                      <QrCode className="h-3 w-3 mr-1" />
                      <span>Verify: {certificateId.substring(0, 8)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            This certificate verifies the completion of the course and does not
            constitute a formal qualification.
          </div>
        </div>
      </div>
    </div>
  );
}
