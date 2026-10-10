'use client';

import React from 'react';
import { Users, Linkedin, ArrowUpRight } from 'lucide-react';

const TEAM = [
  {
    name: 'Rohit Agrawal',
    role: 'Web Lead',
    domain: 'Full-Stack Web & Next.js Architecture',
    bio: 'Oversees the web development team, architectures modern platforms, and guides students in web technologies.',
    linkedin: 'https://www.linkedin.com/in/rohit-agrawal-5444ra/',
    color: 'border-[#4285F4]',
    tag: 'Web Track',
  },
  {
    name: 'Jagravi Bisen',
    role: 'Marketing Lead',
    domain: 'Outreach & Growth Campaigns',
    bio: 'Drives chapter outreach, student engagement campaigns, and event brand presence across campus.',
    linkedin: 'https://www.linkedin.com/in/jagravibisen/',
    color: 'border-[#EA4335]',
    tag: 'Marketing',
  },
  {
    name: 'Adarsh Jha',
    role: 'Competitive Programming Lead',
    domain: 'Algorithms, Data Structures & Contests',
    bio: 'Mentors students for coding competitions, hackathons, and technical problem solving.',
    linkedin: 'https://www.linkedin.com/in/adarsh-jha-3a814a321/',
    color: 'border-[#FBBC05]',
    tag: 'CP Track',
  },
  {
    name: 'Vivian Demello',
    role: 'MAC Lead',
    domain: 'Machine Learning & Cloud',
    bio: 'Spearheads applied AI, machine learning codelabs, and Google Cloud tracks for students.',
    linkedin: 'https://www.linkedin.com/in/viviandemello/',
    color: 'border-[#34A853]',
    tag: 'MAC Track',
  },
  {
    name: 'Arshpreet Puri',
    role: 'Socials Lead',
    domain: 'Community & Digital Presence',
    bio: 'Manages GDG RBU digital communications, community highlights, and official media channels.',
    linkedin: 'https://www.linkedin.com/in/arshpreet-puri-41b9702a8/',
    color: 'border-[#4285F4]',
    tag: 'Social Media',
  },
  {
    name: 'Saarth Meshram',
    role: 'Management Lead',
    domain: 'Operations & Event Logistics',
    bio: 'Coordinates chapter logistics, venue planning, event scheduling, and operational execution.',
    linkedin: 'https://www.linkedin.com/in/saarthm/',
    color: 'border-[#EA4335]',
    tag: 'Operations',
  },
  {
    name: 'Gayatri Donode',
    role: 'Design Lead',
    domain: 'UI/UX & Visual Design Systems',
    bio: 'Designs event brand identities, posters, banners, and intuitive user experiences for campus initiatives.',
    linkedin: 'https://www.linkedin.com/in/gayatridonode/',
    color: 'border-[#FBBC05]',
    tag: 'Creative Lead',
  },
];

export default function TeamPage() {
  return (
    <div className="space-y-12 py-6">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-pixel uppercase tracking-wider border-2 border-black dark:border-white bg-[#34A853] text-white shadow-[2px_2px_0px_0px_#000000]">
          <Users className="w-3.5 h-3.5" />
          Core Team
        </div>
        <h1 className="font-pixel text-3xl sm:text-5xl text-neutral-900 dark:text-white leading-tight">
          Meet the GDG RBU Team
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-medium">
          The official student leads organizing workshops, hackathons, and community development at Ramdeobaba University.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEAM.map((member, idx) => (
          <div
            key={idx}
            className={`rounded-3xl border-3 ${member.color} bg-white dark:bg-neutral-900 p-6 shadow-[6px_6px_0px_0px_#000000] dark:shadow-[6px_6px_0px_0px_#4285F4] flex flex-col justify-between space-y-5 hover:-translate-y-1 transition-all`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl border-2 border-black bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white flex items-center justify-center font-pixel text-lg shadow-[2px_2px_0px_0px_#000000]">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-pixel uppercase tracking-wider border border-black dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                  {member.tag}
                </span>
              </div>

              <div>
                <h3 className="font-pixel text-lg text-neutral-900 dark:text-white">{member.name}</h3>
                <p className="text-xs font-bold text-[#4285F4] mt-1">{member.role}</p>
                <p className="text-[11px] font-semibold text-neutral-400 mt-0.5">{member.domain}</p>
              </div>

              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                {member.bio}
              </p>
            </div>

            <div className="pt-3 border-t-2 border-dashed border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-black dark:border-white bg-[#4285F4] text-white text-xs font-bold shadow-[2px_2px_0px_0px_#000000] hover:bg-blue-600 transition-colors"
                aria-label={`${member.name} LinkedIn`}
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
