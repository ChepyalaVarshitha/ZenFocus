import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQTopic {
  title: string;
  color: string;
  items: FAQItem[];
}

export default function FAQ() {
  const [openTopics, setOpenTopics] = useState<Set<number>>(new Set());
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set());

  const faqTopics: FAQTopic[] = [
    {
      title: "Getting Started",
      color: "blue-400",
      items: [
        {
          question: "How do I create my first study session?",
          answer: "To create your first study session, click on the timer, set your desired duration using the preset buttons or custom time, and click 'Start' to begin your focused study time."
        },
        {
          question: "What is the Pomodoro Technique?",
          answer: "The Pomodoro Technique is a time management method that uses 25-minute focused work intervals followed by short breaks to enhance productivity and maintain concentration."
        },
        {
          question: "How do I add my first task?",
          answer: "Navigate to the Tasks tab, click 'Add Task', enter your task name, select the difficulty level (easy, medium, or hard), and click 'Add Task' to save it."
        },
        {
          question: "Can I customize timer durations?",
          answer: "Yes, you can use the preset buttons (15m, 25m, 45m, 60m) or click 'Set' to enter a custom duration that fits your study preferences."
        },
        {
          question: "Is StudyFlow free to use?",
          answer: "StudyFlow offers a free tier with core features. Premium features like advanced analytics and unlimited storage are available with a subscription."
        },
        {
          question: "How do I sync across devices?",
          answer: "Create an account and sign in on all your devices. Your tasks, notes, and progress will automatically sync across all platforms."
        },
        {
          question: "What browsers are supported?",
          answer: "StudyFlow works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience."
        }
      ]
    },
    {
      title: "Timer & Pomodoro Features",
      color: "green-400",
      items: [
        {
          question: "How do breaks work in Pomodoro sessions?",
          answer: "After each 25-minute focus session, take a 5-minute break. After every 4 sessions, take a longer 15-30 minute break to recharge."
        },
        {
          question: "Can I pause the timer?",
          answer: "Yes, click the pause button to temporarily stop the timer. However, for best results with the Pomodoro Technique, try to complete sessions without interruption."
        },
        {
          question: "Will I get notifications when time is up?",
          answer: "Yes, StudyFlow will send browser notifications when your study session or break time ends. Make sure to allow notifications for the best experience."
        },
        {
          question: "Does the timer continue if I close the browser?",
          answer: "The timer will pause if you close the browser tab. We recommend keeping the tab open or using our mobile app for continuous timing."
        },
        {
          question: "Can I track different types of study sessions?",
          answer: "Currently, all sessions are tracked together. We're working on adding subject-specific tracking in future updates."
        },
        {
          question: "How accurate is the timer?",
          answer: "Our timer is accurate to the second and uses reliable web technologies to maintain precision even during extended study sessions."
        },
        {
          question: "Can I use custom sounds for notifications?",
          answer: "Custom notification sounds are planned for future releases. Currently, we use the browser's default notification sound."
        }
      ]
    },
    {
      title: "Tasks & Productivity",
      color: "indigo-400",
      items: [
        {
          question: "What do difficulty levels mean?",
          answer: "Easy tasks are quick items (5-15 minutes), Medium tasks require moderate effort (15-45 minutes), and Hard tasks are complex projects (45+ minutes)."
        },
        {
          question: "Can I organize tasks by subject or project?",
          answer: "Task categorization and project organization features are coming in our next major update. Currently, you can use prefixes in task names."
        },
        {
          question: "How do I prioritize tasks?",
          answer: "While we don't have explicit priority settings yet, we recommend ordering tasks by importance and tackling hard tasks during your most productive hours."
        },
        {
          question: "Can I set deadlines for tasks?",
          answer: "Task deadlines are on our roadmap for future releases. For now, you can use the Notes feature to track important due dates."
        },
        {
          question: "Is there a limit to how many tasks I can add?",
          answer: "Free accounts can have up to 50 active tasks. Premium accounts have unlimited task storage and advanced organization features."
        },
        {
          question: "How does task completion tracking work?",
          answer: "Check off tasks as you complete them. Your progress is automatically tracked and contributes to your daily and weekly productivity statistics."
        },
        {
          question: "Can I recover deleted tasks?",
          answer: "Deleted tasks are kept in a recycle bin for 30 days before permanent deletion. Contact support if you need to recover an old task."
        }
      ]
    },
    {
      title: "Notes & Reminders",
      color: "yellow-400",
      items: [
        {
          question: "How do reminder notifications work?",
          answer: "Set custom dates and times for your notes, and StudyFlow will send browser notifications at the specified time to remind you of important information."
        },
        {
          question: "Can I format text in my notes?",
          answer: "Rich text formatting including bold, italic, bullet points, and links will be available in the next update. Currently, notes support plain text."
        },
        {
          question: "Is there a character limit for notes?",
          answer: "Each note can contain up to 10,000 characters. For longer content, consider breaking it into multiple related notes."
        },
        {
          question: "Can I attach files to notes?",
          answer: "File attachments are planned for future releases. Currently, you can include links to external files or cloud storage in your notes."
        },
        {
          question: "How do I search through my notes?",
          answer: "A search feature for notes and tasks is coming soon. For now, you can use your browser's find function (Ctrl+F) to search visible notes."
        },
        {
          question: "Can I share notes with others?",
          answer: "Note sharing and collaboration features are on our development roadmap. Currently, notes are private to your account."
        },
        {
          question: "What happens if I miss a reminder?",
          answer: "Missed reminders will show as overdue in your dashboard. You can reschedule them or mark them as completed from your notes list."
        }
      ]
    },
    {
      title: "Account & Progress Tracking",
      color: "purple-400",
      items: [
        {
          question: "How is my progress calculated?",
          answer: "Progress is based on completed tasks, study time, and consistency. Easy tasks give 1 point, medium tasks give 2 points, and hard tasks give 3 points."
        },
        {
          question: "Can I export my data?",
          answer: "Data export functionality is available in account settings. You can export your tasks, notes, and progress data in CSV or JSON format."
        },
        {
          question: "How do I add skills to my profile?",
          answer: "Go to your profile, click on Skills, then 'Add Skill'. Enter the skill name and set your current level from beginner to expert."
        },
        {
          question: "What file types can I upload for achievements?",
          answer: "You can upload JPG, PNG, or PDF files up to 10MB in size. These are perfect for certificates, diplomas, or achievement screenshots."
        },
        {
          question: "How do I delete my account?",
          answer: "Account deletion can be requested from your profile settings. All data will be permanently deleted after a 14-day grace period."
        },
        {
          question: "Can I change my email address?",
          answer: "Yes, you can update your email address in profile settings. You'll need to verify the new email address before the change takes effect."
        },
        {
          question: "Is my data secure?",
          answer: "Yes, we use industry-standard encryption and security practices. Your data is encrypted both in transit and at rest on our servers."
        }
      ]
    },
    {
      title: "Technical Support",
      color: "red-400",
      items: [
        {
          question: "The timer isn't working properly. What should I do?",
          answer: "Try refreshing the page and clearing your browser cache. If the issue persists, contact our support team with details about your browser and device."
        },
        {
          question: "I'm not receiving notifications. How can I fix this?",
          answer: "Check that notifications are enabled for StudyFlow in your browser settings. Also ensure your device's 'Do Not Disturb' mode isn't blocking notifications."
        },
        {
          question: "My data seems to have disappeared. Can you help?",
          answer: "First, try logging out and back in. If you're still missing data, contact support immediately. We keep backups and can often recover lost information."
        },
        {
          question: "The website is running slowly. Is there a fix?",
          answer: "Slow performance can be caused by browser extensions or too many open tabs. Try using StudyFlow in an incognito window or different browser."
        },
        {
          question: "I found a bug. How do I report it?",
          answer: "Use the Contact Us form to report bugs. Include details about what you were doing when the bug occurred, your browser, and any error messages."
        },
        {
          question: "Can I use StudyFlow offline?",
          answer: "StudyFlow requires an internet connection for full functionality. Limited offline features like basic timer functionality are planned for future releases."
        },
        {
          question: "How do I contact technical support?",
          answer: "Use our Contact Us form for technical issues. For urgent problems, you can also email support@studyflow.com directly with your account details."
        }
      ]
    }
  ];

  const toggleTopic = (index: number) => {
    const newOpenTopics = new Set(openTopics);
    if (newOpenTopics.has(index)) {
      newOpenTopics.delete(index);
    } else {
      newOpenTopics.add(index);
    }
    setOpenTopics(newOpenTopics);
  };

  const toggleQuestion = (topicIndex: number, questionIndex: number) => {
    const key = `${topicIndex}-${questionIndex}`;
    const newOpenQuestions = new Set(openQuestions);
    if (newOpenQuestions.has(key)) {
      newOpenQuestions.delete(key);
    } else {
      newOpenQuestions.add(key);
    }
    setOpenQuestions(newOpenQuestions);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
      
      <div className="space-y-6">
        {faqTopics.map((topic, topicIndex) => (
          <Card key={topicIndex} className="shadow-sm border border-gray-100">
            <button
              onClick={() => toggleTopic(topicIndex)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              data-testid={`button-faq-topic-${topicIndex}`}
            >
              <span className="text-lg font-semibold text-gray-900">{topic.title}</span>
              {openTopics.has(topicIndex) ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {openTopics.has(topicIndex) && (
              <div className="px-6 pb-4 space-y-3">
                {topic.items.map((item, questionIndex) => (
                  <div 
                    key={questionIndex} 
                    className={`border-l-4 border-${topic.color} pl-4`}
                  >
                    <button
                      onClick={() => toggleQuestion(topicIndex, questionIndex)}
                      className="text-left text-gray-700 hover:text-blue-600 transition-colors w-full"
                      data-testid={`button-faq-question-${topicIndex}-${questionIndex}`}
                    >
                      {item.question}
                    </button>
                    {openQuestions.has(`${topicIndex}-${questionIndex}`) && (
                      <div 
                        className="mt-2 text-sm text-gray-600"
                        data-testid={`text-faq-answer-${topicIndex}-${questionIndex}`}
                      >
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
