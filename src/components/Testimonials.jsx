import React from 'react';

const testimonials = [
    {
        content: "Braino AI helped me through a really tough time. It felt like I had a friend who was always there to listen without judgment.",
        author: "Sarah J.",
        role: "User",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        content: "I was skeptical at first, but the advice I got was surprisingly practical and helpful. It's a great tool for managing daily stress.",
        author: "Michael T.",
        role: "User",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        content: "As someone who can't afford therapy right now, this has been a lifesaver. It's not a replacement, but it's an amazing support system.",
        author: "Emily R.",
        role: "User",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
];

const Testimonials = () => {
    return (
        <section className="py-12 bg-gray-50 overflow-hidden md:py-20 lg:py-24" id="testimonials">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative">
                    <div className="text-center">
                        <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
                            Trusted by people like you
                        </h2>
                        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                            See how Braino AI is making a difference in people's lives.
                        </p>
                    </div>
                    <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.author} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-indigo-600">
                                            Testimonial
                                        </p>
                                        <div className="block mt-2">
                                            <p className="text-xl font-semibold text-gray-900">
                                                "{testimonial.content}"
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex items-center">
                                        <div className="flex-shrink-0">
                                            <img className="h-10 w-10 rounded-full" src={testimonial.image} alt="" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">
                                                {testimonial.author}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
