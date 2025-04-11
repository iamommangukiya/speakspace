import { db } from './firebase';
import { collection, addDoc, Timestamp, doc, setDoc } from 'firebase/firestore';

// Function to seed leaderboard data and practice sessions
export const seedLeaderboardData = async () => {
  try {
    // Sample users with their stats
    const users = [
      {
        uid: 'user1',
        name: 'Michael Johnson',
        email: 'michael@example.com',
        photoURL: '/placeholder.svg?height=80&width=80&text=MJ',
        stats: {
          practiceSessionsCompleted: 42,
          totalPracticeTime: 2520,
          averageScore: 95
        }
      },
      {
        uid: 'user2',
        name: 'Emily Chen',
        email: 'emily@example.com',
        photoURL: '/placeholder.svg?height=80&width=80&text=EC',
        stats: {
          practiceSessionsCompleted: 28,
          totalPracticeTime: 1680,
          averageScore: 92
        }
      },
      {
        uid: 'user3',
        name: 'Sarah Williams',
        email: 'sarah@example.com',
        photoURL: '/placeholder.svg?height=80&width=80&text=SW',
        stats: {
          practiceSessionsCompleted: 23,
          totalPracticeTime: 1380,
          averageScore: 89
        }
      },
      {
        uid: 'user4',
        name: 'Alex Doe',
        email: 'alex@example.com',
        photoURL: '/placeholder.svg?height=40&width=40&text=AD',
        stats: {
          practiceSessionsCompleted: 19,
          totalPracticeTime: 1140,
          averageScore: 87
        }
      },
      {
        uid: 'user5',
        name: 'Jessica Lee',
        email: 'jessica@example.com',
        photoURL: '/placeholder.svg?height=40&width=40&text=JL',
        stats: {
          practiceSessionsCompleted: 15,
          totalPracticeTime: 900,
          averageScore: 85
        }
      }
    ];

    // Add users to Firestore
    for (const user of users) {
      await setDoc(doc(db, 'users', user.uid), {
        ...user,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      console.log(`Added user: ${user.name}`);
    }

    // Add leaderboard entries
    const categories = ['overall', 'confidence', 'communication', 'logic'];
    
    for (const user of users) {
      for (const category of categories) {
        // Calculate a slightly different score for each category
        let score = user.stats.averageScore;
        if (category === 'confidence') score = Math.max(60, score - 5);
        if (category === 'communication') score = Math.min(99, score + 2);
        if (category === 'logic') score = Math.max(60, score - 8);

        await addDoc(collection(db, 'leaderboard_entries'), {
          userId: user.uid,
          category,
          score,
          timestamp: Timestamp.now()
        });
        console.log(`Added ${category} entry for ${user.name}`);
      }
    }

    // Add practice sessions
    const practiceSessions = [
      {
        title: "Technical Interview Practice",
        description: "Practice for software engineering roles with mock interviews focusing on algorithms and system design.",
        startTime: new Date(Date.now() + 15 * 60000), // 15 minutes from now
        duration: 60, // 60 minutes
        participants: ["user1", "user3"],
        maxParticipants: 5,
        tags: ["Technical", "Software", "Beginner-Friendly"],
        type: "interview",
        createdBy: "user1",
        status: "scheduled"
      },
      {
        title: "Group Discussion: AI Ethics",
        description: "Discuss the ethical implications of AI in today's society and future considerations.",
        startTime: new Date(Date.now() + 30 * 60000), // 30 minutes from now
        duration: 45, // 45 minutes
        participants: ["user2", "user4", "user5"],
        maxParticipants: 8,
        tags: ["AI", "Ethics", "Discussion"],
        type: "group_discussion",
        createdBy: "user2",
        status: "scheduled"
      },
      {
        title: "HR Interview Preparation",
        description: "Practice answering common HR interview questions and receive feedback on your responses.",
        startTime: new Date(Date.now() + 60 * 60000), // 1 hour from now
        duration: 30, // 30 minutes
        participants: ["user3"],
        maxParticipants: 3,
        tags: ["HR", "Behavioral", "Career"],
        type: "interview",
        createdBy: "user3",
        status: "scheduled"
      },
      {
        title: "System Design Interview",
        description: "Practice designing scalable systems and architectures for technical interviews.",
        startTime: new Date(Date.now() + 120 * 60000), // 2 hours from now
        duration: 90, // 90 minutes
        participants: ["user1", "user2"],
        maxParticipants: 4,
        tags: ["System Design", "Architecture", "Advanced"],
        type: "interview",
        createdBy: "user1",
        status: "scheduled"
      },
      {
        title: "Behavioral Interview Practice",
        description: "Focus on STAR method responses for behavioral questions in job interviews.",
        startTime: new Date(Date.now() + 180 * 60000), // 3 hours from now
        duration: 45, // 45 minutes
        participants: ["user5"],
        maxParticipants: 2,
        tags: ["Behavioral", "STAR Method", "One-on-One"],
        type: "interview",
        createdBy: "user5",
        status: "scheduled"
      }
    ];

    // Add practice sessions to Firestore
    for (const session of practiceSessions) {
      await addDoc(collection(db, 'practice_sessions'), {
        ...session,
        startTime: Timestamp.fromDate(session.startTime),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      console.log(`Added practice session: ${session.title}`);
    }

    return { success: true, message: 'Sample data seeded successfully!' };
  } catch (error: unknown) {
    console.error('Error seeding data:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { success: false, message: `Error: ${errorMessage}` };
  }
};