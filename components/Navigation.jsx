'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Navigation = () => {
    const { data: session } = useSession()
    const [providers, setProviders] = useState(null)
    const [toggleDropDown, setToggleDropDown] = useState(false)

    useEffect(() => {
        const fetchProviders = async () => {
            const providers = await getProviders()
            setProviders(providers)
        }
        fetchProviders()
    }, [])

    return (
        <nav className="flex-between w=full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image
                    src="/assets/images/logo.svg"
                    height={30}
                    width={30}
                    alt="promptopia-logo"
                    className="object-contain"
                />
                <p className="logo_text">Promptopia</p>
            </Link>
            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">
                            Create Post
                        </Link>
                        <Link href="/upload-docs" className="black_btn">
                            Upload Files
                        </Link>
                        <button
                            type="button"
                            className="outline_btn"
                            onClick={signOut}
                        >
                            Sign Out
                        </button>
                        <Link href="/profile">
                            <Image
                                src={session?.user.image}
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="profile"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    key={provider.name}
                                    type="button"
                                    onClick={() => signIn(provider.id)}
                                >
                                    Sign in with {provider.name}
                                </button>
                            ))}
                    </>
                )}
            </div>
            <div className="sm:hidden flex realtive">
                {session?.user ? (
                    <div className="flex">
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="profile"
                            onClick={() => setToggleDropDown(!toggleDropDown)}
                        />
                        {toggleDropDown && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropDown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href="/create-prompt"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropDown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <Link
                                    href="/upload-docs"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropDown(false)}
                                >
                                    Upload Files
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        toggleDropDown(false)
                                        signOut()
                                    }}
                                    className="mt-5 w-full black_btn"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    key={provider.name}
                                    type="button"
                                    onClick={() => signIn(provider.id)}
                                >
                                    Sign in with {provider.name}
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navigation
