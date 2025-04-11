import { db } from './firebase';
import { collection, addDoc, Timestamp, doc, setDoc } from 'firebase/firestore';

// Function to seed leaderboard data
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

    return { success: true, message: 'Sample data seeded successfully!' };
  } catch (error) {
    console.error('Error seeding data:', error);
    return { success: false, message: `Error: ${error.message}` };
  }
};