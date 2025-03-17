import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PricingSection = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  const pricingTiers = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for getting started',
      features: [
        'Task Management Basics',
        'Daily Focus Session',
        'Basic Analytics',
        '3 Projects',
        'Mobile App Access'
      ],
      cta: 'Get Started',
      popular: false,
      gradient: 'from-gray-700 to-gray-800'
    },
    {
      name: 'Pro',
      price: '9.99',
      description: 'For serious productivity',
      features: [
        'Everything in Free',
        'Unlimited Projects',
        'Advanced Analytics',
        'Goal Setting & Tracking',
        'Priority Support',
        'Team Collaboration (up to 3)'
      ],
      cta: 'Start 14-Day Trial',
      popular: true,
      gradient: 'from-blue-600 to-indigo-600'
    },
    {
      name: 'Enterprise',
      price: '29.99',
      description: 'For teams and organizations',
      features: [
        'Everything in Pro',
        'Unlimited Team Members',
        'Advanced Permissions',
        'Admin Dashboard',
        'API Access',
        'Dedicated Support',
        'Custom Integrations'
      ],
      cta: 'Contact Sales',
      popular: false,
      gradient: 'from-gray-700 to-gray-800'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white/90 backdrop-blur-sm relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            className="text-blue-600 font-semibold mb-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            PRICING PLANS
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={1}
          >
            Choose The Right Plan For You
          </motion.h2>
          <motion.p
            className="text-xl text-gray-700"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={2}
          >
            Flexible options to suit individuals and teams of all sizes
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              className={`bg-white rounded-2xl shadow-lg flex-1 overflow-hidden border ${tier.popular ? 'border-blue-500 scale-105' : 'border-gray-100'}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={index * 0.2 + 3}
            >
              {tier.popular && (
                <div className="bg-blue-500 text-white text-center py-1.5 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900">${tier.price}</span>
                  <span className="ml-1 text-xl text-gray-500">/month</span>
                </div>
                <p className="mt-2 text-gray-600">{tier.description}</p>
                
                <ul className="mt-8 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className={`flex-shrink-0 h-5 w-5 rounded-full bg-gradient-to-r ${tier.popular ? 'from-blue-500 to-indigo-500' : 'from-gray-700 to-gray-600'} flex items-center justify-center`}>
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <p className="ml-3 text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <Button 
                    className={`w-full py-3 ${tier.popular ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900'}`}
                  >
                    {tier.cta}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;