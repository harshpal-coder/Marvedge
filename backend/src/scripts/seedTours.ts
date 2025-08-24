import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Tour from '../models/Tour';
import User from '../models/User';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tourapp';

const DEMO_TOURS = [
  {
    title: 'Getting Started with Marvedge',
    steps: [
      { id: '1', description: 'Welcome to your first tour! Click next to continue.' },
      { id: '2', description: 'Upload a screenshot or record your screen.' },
      { id: '3', description: 'Add highlights and descriptions to each step.' },
      { id: '4', description: 'Publish and share your interactive tour!' },
    ],
    visibility: 'public',
    views: 123,
  },
  {
    title: 'Product Demo: Task Manager',
    steps: [
      { id: '1', description: 'Log in to your dashboard.' },
      { id: '2', description: 'Create a new task and assign it to a team member.' },
      { id: '3', description: 'Track progress and mark tasks as complete.' },
    ],
    visibility: 'public',
    views: 87,
  },
  {
    title: 'Feature Walkthrough: Analytics',
    steps: [
      { id: '1', description: 'Navigate to the Analytics tab.' },
      { id: '2', description: 'View user engagement and tour completion rates.' },
      { id: '3', description: 'Export analytics reports for your team.' },
    ],
    visibility: 'public',
    views: 54,
  },
  {
    title: 'Onboarding: HR Portal',
    steps: [
      { id: '1', description: 'Access the HR portal from the main menu.' },
      { id: '2', description: 'Update your personal information.' },
      { id: '3', description: 'Submit your leave request online.' },
    ],
    visibility: 'public',
    views: 42,
  },
  {
    title: 'Sales Demo: CRM Pipeline',
    steps: [
      { id: '1', description: 'Open the CRM dashboard.' },
      { id: '2', description: 'Add a new lead to your pipeline.' },
      { id: '3', description: 'Move leads through the sales stages.' },
      { id: '4', description: 'Close a deal and record the outcome.' },
    ],
    visibility: 'public',
    views: 65,
  },
  {
    title: 'Support Guide: Password Reset',
    steps: [
      { id: '1', description: 'Click on “Forgot Password” at login.' },
      { id: '2', description: 'Enter your registered email address.' },
      { id: '3', description: 'Check your inbox for the reset link.' },
      { id: '4', description: 'Set a new password and log in.' },
    ],
    visibility: 'public',
    views: 38,
  },
  {
    title: 'Training: Inventory Management',
    steps: [
      { id: '1', description: 'Go to the Inventory section.' },
      { id: '2', description: 'Add a new product with details.' },
      { id: '3', description: 'Update stock levels and locations.' },
      { id: '4', description: 'Generate inventory reports.' },
    ],
    visibility: 'public',
    views: 29,
  },
  {
    title: 'Walkthrough: Project Collaboration',
    steps: [
      { id: '1', description: 'Create a new project workspace.' },
      { id: '2', description: 'Invite team members to join.' },
      { id: '3', description: 'Assign tasks and set deadlines.' },
      { id: '4', description: 'Share files and track progress.' },
    ],
    visibility: 'public',
    views: 51,
  },
  {
    title: 'Demo: E-commerce Checkout Flow',
    steps: [
      { id: '1', description: 'Add items to your shopping cart.' },
      { id: '2', description: 'Proceed to checkout and enter shipping info.' },
      { id: '3', description: 'Select payment method and review order.' },
      { id: '4', description: 'Place your order and receive confirmation.' },
    ],
    visibility: 'public',
    views: 73,
  },
  {
    title: 'How-To: Customizing Your Profile',
    steps: [
      { id: '1', description: 'Go to your profile settings.' },
      { id: '2', description: 'Upload a profile picture.' },
      { id: '3', description: 'Edit your bio and contact info.' },
      { id: '4', description: 'Save changes and preview your profile.' },
    ],
    visibility: 'public',
    views: 34,
  },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  const user = await User.findOne();
  if (!user) {
    console.error('No user found. Please sign up at least one user first.');
    process.exit(1);
  }
  for (const demo of DEMO_TOURS) {
    await Tour.create({
      ...demo,
      owner: user.email,
    });
  }
  console.log('Demo tours inserted!');
  await mongoose.disconnect();
}

seed();