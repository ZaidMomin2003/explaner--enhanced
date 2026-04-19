import {
    collection,
    doc,
    addDoc,
    deleteDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
    type Unsubscribe,
    Timestamp,
} from 'firebase/firestore'
import { db } from '@/config/firebase'

export interface Project {
    id: string
    name: string
    url: string
    status: 'planning' | 'generating' | 'rendered' | 'exported'
    music: boolean
    speech: boolean
    sfx: boolean
    instructions: string
    createdAt: number
}

interface ProjectDoc {
    name: string
    url: string
    status: string
    music: boolean
    speech: boolean
    sfx: boolean
    instructions: string
    createdAt: Timestamp | null
}

function getUserProjectsRef(uid: string) {
    return collection(db, 'users', uid, 'projects')
}

export async function createProject(
    uid: string,
    data: { name: string; url: string; music: boolean; speech: boolean; sfx: boolean; instructions: string }
): Promise<string> {
    const ref = getUserProjectsRef(uid)
    const docRef = await addDoc(ref, {
        name: data.name,
        url: data.url,
        status: 'planning',
        music: data.music,
        speech: data.speech,
        sfx: data.sfx,
        instructions: data.instructions,
        createdAt: serverTimestamp(),
    })
    return docRef.id
}

export async function deleteProject(uid: string, projectId: string): Promise<void> {
    const docRef = doc(db, 'users', uid, 'projects', projectId)
    await deleteDoc(docRef)
}

export function subscribeToProjects(
    uid: string,
    callback: (projects: Project[]) => void
): Unsubscribe {
    const ref = getUserProjectsRef(uid)
    const q = query(ref, orderBy('createdAt', 'desc'))

    return onSnapshot(q, (snapshot) => {
        const projects: Project[] = snapshot.docs.map((doc) => {
            const data = doc.data() as ProjectDoc
            return {
                id: doc.id,
                name: data.name,
                url: data.url,
                status: data.status as Project['status'],
                music: data.music ?? false,
                speech: data.speech ?? false,
                sfx: data.sfx ?? false,
                instructions: data.instructions ?? '',
                createdAt: data.createdAt?.toMillis?.() ?? Date.now(),
            }
        })
        callback(projects)
    })
}
