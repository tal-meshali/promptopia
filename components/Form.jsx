import React from 'react'
import Link from 'next/link'
import DropZone from './DropZone'

const Form = ({ type, submit, handleSubmit, post, setPost }) => {
    return (
        <section className="w-full max-w-full flex-start flex-col">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{type} Post</span>

                <p className="desc text-left max-w-md">
                    {type} a post to the community and think your'e something by
                    shitting creativity on the world.
                </p>
            </h1>
            <form
                className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
                onSubmit={handleSubmit}
            >
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Your Shitty Prompt
                    </span>
                    <textarea
                        value={post.prompt}
                        onChange={(e) =>
                            setPost({ ...post, prompt: e.target.value })
                        }
                        placeholder="Write evil stuff to make world explode"
                        className="form_textarea"
                    />
                </label>
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Tag{' '}
                        <span className="font-normal">
                            (#product, #webdev, #nazi)
                        </span>
                    </span>
                    <input
                        value={post.tag}
                        onChange={(e) =>
                            setPost({ ...post, tag: e.target.value })
                        }
                        placeholder="#trendy_af"
                        required
                        className="form_input"
                    />
                </label>
                <div className="flex-end mx-3 mb-5 gap-4">
                    <Link href="/" className="text-gray-500 text-sm">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={submit}
                        className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
                    >
                        {submit
                            ? `${
                                  type[-1] === 'e' ? type.slice(0, -1) : type
                              }ing...`
                            : `${type}`}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default Form
