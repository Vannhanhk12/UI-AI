import { motion } from "framer-motion";
import {
  Heart,
  Star,
  Coffee,
  Code,
  Zap,
  Award,
  BookOpen,
  Lightbulb,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const About = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const passions = [
    {
      title: "Web Development",
      description:
        "Building beautiful, responsive, and user-friendly web applications.",
      icon: <Code className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "UI/UX Design",
      description:
        "Creating intuitive and engaging user experiences that delight users.",
      icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
    },
    {
      title: "Continuous Learning",
      description: "Always exploring new technologies and improving my skills.",
      icon: <BookOpen className="h-8 w-8 text-green-600" />,
    },
    {
      title: "Problem Solving",
      description: "Finding elegant solutions to complex technical challenges.",
      icon: <Zap className="h-8 w-8 text-purple-600" />,
    },
  ];

  const funFacts = [
    "Drinks 5 cups of coffee daily while coding",
    "Has contributed to over 20 open-source projects",
    "Can type at 120 words per minute",
    "Loves to solve algorithm puzzles in free time",
    "Has a collection of vintage programming books",
    "Mentors junior developers on weekends",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl mx-auto mb-6"
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nyan"
              alt="Nyan"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            About Nyan
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            Passionate developer, designer, and creative problem solver with a
            love for building beautiful and functional web applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center space-x-4"
          >
            <Button className="rounded-full bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
              <Heart size={18} />
              Connect
            </Button>
            <Button
              variant="outline"
              className="rounded-full flex items-center gap-2"
            >
              <Coffee size={18} />
              Buy me a coffee
            </Button>
          </motion.div>
        </motion.div>

        {/* My Story Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="border-none shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="text-2xl">My Story</CardTitle>
              <CardDescription className="text-blue-100">
                The journey that brought me here
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-700 mb-4">
                I started my journey in web development over 5 years ago, driven
                by a curiosity to understand how the websites I used every day
                were built. What began as a hobby quickly turned into a passion
                as I discovered the joy of bringing ideas to life through code.
              </p>
              <p className="text-gray-700 mb-4">
                After completing my degree in Computer Science, I worked with
                several startups where I honed my skills in modern web
                technologies. I've always been drawn to the intersection of
                technology and design, believing that the best digital products
                are both functional and beautiful.
              </p>
              <p className="text-gray-700">
                Today, I specialize in building responsive web applications with
                React, TypeScript, and modern CSS frameworks. I'm constantly
                learning and exploring new technologies to stay at the cutting
                edge of web development. My goal is to create digital
                experiences that are not only visually appealing but also
                accessible and performant for all users.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* What I'm Passionate About */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center justify-center">
            <Heart className="mr-2 text-red-500" size={24} />
            What I'm Passionate About
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {passions.map((passion, index) => (
              <motion.div
                key={passion.title}
                variants={fadeInUp}
                className="h-full"
              >
                <Card className="border-none shadow-md hover:shadow-lg transition-all h-full">
                  <CardHeader className="pb-2 flex flex-col items-center">
                    <div className="mb-4 p-3 rounded-full bg-gray-100">
                      {passion.icon}
                    </div>
                    <CardTitle className="text-center">
                      {passion.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">
                      {passion.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fun Facts */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center justify-center">
            <Star className="mr-2 text-yellow-500" size={24} />
            Fun Facts About Me
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {funFacts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500 flex items-start">
                  <Award className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">{fact}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
