import { motion } from "framer-motion";
import {
  Code,
  Award,
  Briefcase,
  Star,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  const skills = [
    { name: "React", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "UI/UX Design", level: 80 },
    { name: "GraphQL", level: 75 },
    { name: "AWS", level: 70 },
  ];

  const projects = [
    {
      title: "TaskMaster Pro",
      description:
        "A productivity application with task management, time tracking, and analytics.",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "#",
    },
    {
      title: "E-Commerce Platform",
      description:
        "Full-featured online store with payment processing and inventory management.",
      technologies: ["Next.js", "Stripe", "PostgreSQL"],
      link: "#",
    },
    {
      title: "Social Media Dashboard",
      description:
        "Analytics dashboard for tracking engagement across multiple social platforms.",
      technologies: ["React", "D3.js", "Firebase"],
      link: "#",
    },
  ];

  const experiences = [
    {
      role: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      period: "2020 - Present",
      description:
        "Led development of multiple web applications using React and TypeScript.",
    },
    {
      role: "UI/UX Designer",
      company: "DesignHub",
      period: "2018 - 2020",
      description:
        "Created user interfaces and experiences for various client projects.",
    },
    {
      role: "Junior Developer",
      company: "StartupX",
      period: "2016 - 2018",
      description:
        "Developed and maintained web applications using JavaScript and CSS.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="relative inline-block mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl mx-auto"
            >
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nyan"
                alt="Nyan"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg"
            >
              <Award size={20} />
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-gray-900 mb-2"
          >
            Nyan
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-xl text-blue-600 font-medium mb-4">
              Full Stack Developer & UI/UX Designer
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              "Crafting elegant solutions to complex problems through clean code
              and intuitive design."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center space-x-4"
          >
            <Button
              variant="outline"
              className="rounded-full flex items-center gap-2"
            >
              <Github size={18} />
              GitHub
            </Button>
            <Button
              variant="outline"
              className="rounded-full flex items-center gap-2"
            >
              <Linkedin size={18} />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              className="rounded-full flex items-center gap-2"
            >
              <Mail size={18} />
              Contact
            </Button>
          </motion.div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold text-gray-900 mb-6 flex items-center"
          >
            <Code className="mr-2 text-blue-600" size={24} />
            Technical Skills
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div key={skill.name} variants={itemVariants}>
                <Card className="border-none shadow-md hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-gray-900">
                        {skill.name}
                      </h3>
                      <span className="text-blue-600 font-medium">
                        {skill.level}%
                      </span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Projects Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold text-gray-900 mb-6 flex items-center"
          >
            <Briefcase className="mr-2 text-blue-600" size={24} />
            Featured Projects
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div key={project.title} variants={itemVariants}>
                <Card className="border-none shadow-md h-full hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-start">
                      <span>{project.title}</span>
                      <Button variant="ghost" size="icon" asChild>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={16} />
                        </a>
                      </Button>
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold text-gray-900 mb-6 flex items-center"
          >
            <Star className="mr-2 text-blue-600" size={24} />
            Work Experience
          </motion.h2>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div key={exp.role} variants={itemVariants}>
                <Card className="border-none shadow-md hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{exp.role}</CardTitle>
                        <CardDescription>{exp.company}</CardDescription>
                      </div>
                      <Badge variant="outline">{exp.period}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{exp.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
